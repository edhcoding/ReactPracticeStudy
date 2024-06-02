import { useLocale, useSetLocale } from "../contexts/LocaleContext";

export default function LocaleSelect() {
  const locale = useLocale();
  const setLocale = useSetLocale();

  const handleChange = (e) => setLocale(e.target.value);

  return (
    <select value={locale} onChange={handleChange}>
      <option value={"ko"}>한국어</option>
      <option value={"en"}>English</option>
      {/* select태그에 option태그 사용해서 선택할때 마다 전해줄 value 지정  */}
    </select>
  );
}
