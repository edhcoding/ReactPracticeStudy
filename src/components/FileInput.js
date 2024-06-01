import { useEffect, useRef, useState } from "react";

export default function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();

  const inputRef = useRef();

  const handleChange = (e) => {
    onChange(name, e.target.files[0]);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
    // objectURL을 만들면 웹 브라우저는 메모리를 할당하고 파일에 해당하는 주소를 만들어 줌
    // objectURL이 만든 메모리가 바로 - 사이드 이펙트

    //useEffect는 사이드 이펙트를 만들고 정리하는 방법도 제공함 return값으로 함수를 리터하면 됨
    return () => {
      setPreview();
      // 초기화 해주고
      URL.revokeObjectURL(nextPreview);
      // revokeObjextURL - 사이드 이펙트를 정리하는 코드
      // 앞에서 만든 ObjectURL 해제 - 메모리 계속 할당해주는거 막음
    };
  }, [value]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input type="file" accept="image/png, image/jpeg" onChange={handleChange} ref={inputRef} />
      {/* 파일인풋을 이미지 파일 하나만 선택할때 사용할 거기 때문에 accept 속성 */}
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
  // file 타입은 value를 props로 지정 불가 - 해커가 개인정보를 가져갈 수도 있음
  // 따라서 fileInput의 value속성은 사용자만 직접 변경가능
  // 자바스크립트로 바꿀때는 빈문자열로만 변경가능
  // fakepath
  // DOM 노드는 반드시 렌더링이 끝나야 생성이 되니까 ref객체의 current값도 화면에 컴포넌트가 렌더링 되었을때만 존재함
  // 그래서 항상 if (inputRef.current){}로 값이 존재하는지 확인하고 사용하는 걸 추천함
}
