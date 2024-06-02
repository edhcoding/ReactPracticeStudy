import { createContext, useContext, useState } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = "ko", children }) {
  const [locale, setLocale] = useState(defaultValue);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// 매번 LocaleContext, useContext 사용하기 번거로우니까 커스텀 훅 제작
export function useLocale() {
  // locale 값 전달 역할
  const context = useContext(LocaleContext);

  // 이 커스텀 훅 바깥에서 사용하면 context의 값이 없음
  if (!context) {
    throw new Error("반드시 LocalProvider 안에서 사용해야 합니다");
  }

  return context.locale;
}

export function useSetLocale() {
  // setLocale 값 전달 역할
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("반드시 LocalProvider 안에서 사용해야 합니다");
  }

  return context.setLocale;
}
