export default function LocaleSelect({ value, onChange }) {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <select value={value} onChange={handleChange}>
      <option value={"ko"}>한국어</option>
      <option value={"en"}>English</option>
      {/* select태그에 option태그 사용해서 선택할때 마다 전해줄 value 지정  */}
    </select>
  );
}
