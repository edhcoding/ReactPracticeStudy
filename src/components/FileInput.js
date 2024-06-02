import { useEffect, useRef, useState } from "react";

export default function FileInput({ name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  // initialPreview 는 ReviewList에서 imgUrl로 가지고옴
  const inputRef = useRef();

  const handleChange = (e) => {
    onChange(name, e.target.files[0]);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    // imgUrl 값
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    // createObjectURL을 통해 URL을 생성할 수 있음 - 미리보기
    // 주의! ObjectURL은 만들 때 마다 웹 브라우저에 메모리를 할당함 - 사이드 이펙트
    // 파일 선택할때마다 메모리 할당하면 낭비 - 정리해줘야함
    setPreview(nextPreview);

    return () => {
      // useEffect는 사이드 이펙트를 만들면서 정리하는 방법을 제공 - return 문에 콜백 함수 넣음 - 정리함수
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
      // createObjectURL을 통해 생성된 url을 폐기 시킬 수 있음
      // 메모리 할당 해제하면서 사이드 이펙트 정리할 수 있음
    };
  }, [value, initialPreview]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input
        type="file"
        accept="image/png, image/jpeg"
        // 이미지 파일 하나만 선택하는데 사용할 거기 때문에 accept 속성사용
        onChange={handleChange}
        ref={inputRef}
        // ref는 React에서 DOM 요소나 컴포넌트 인스턴스에 접근하기 위한 수단으로 개발자가 지어낸거 아님
      />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}
