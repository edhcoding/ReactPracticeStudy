import { useCallback, useState } from "react";

export default function useAsync(asyncFunction) {
  // 매개변수 asyncFunction 에는 api getReviews가 들어가 있음 (reviews 값)
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = useCallback(
    async (...args) => {
      // args에는 {order: 'createdAt', offset: 0, limit: 6}
      try {
        setError(null);
        setPending(true);
        return await asyncFunction(...args);
      } catch (error) {
        setError(error);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );
  // 안에있는 wrappedFunction도 무한루프 발생 하니까 useCallback으로 감싸줌
  // setter함수가 아닌 asyncFunction 추가해줌
  // app.js로 가보면 useAsync 함수 사용할때 인수로 getReviews라는 함수 넘겨주고 있음
  // getReviews는 한번 선언되면 변하지 않는 값이기 때문에 끝

  return [pending, error, wrappedFunction];
}
