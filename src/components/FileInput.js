export default function FileInput({ name, value, onChange }) {
  const handleChange = (e) => {
    onChange(name, e.target.files[0]);
  };

  return <input type="file" onChange={handleChange} />;
  // file 타입은 value를 props로 지정 불가 - 해커가 개인정보를 가져갈 수도 있음
  // fakepath
}
