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
    setPreview(URL.createObjectURL(value));
    // objectURL을 만들면 웹 브라우저는 메모리를 할당하고 파일에 해당하는 주소를 만들어 줌
  }, [value]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input type="file" onChange={handleChange} ref={inputRef} />
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
