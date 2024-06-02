import { useState, useEffect, useCallback } from "react";
import { createReview, deleteReview, updateReview, getReviews } from "../api";
import useAsync from "../hooks/useAsync";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import LocaleSelect from "./LocaleSelect";
import LocaleContext from "../contexts/LocaleContext";

const LIMIT = 6;

/* "reviews": [ reviews 안에 목록들
  {
    "createdAt":
    "updatedAt":
    "id":
    "title"
    "imgUrl":
    "content":
    "rating":
  }
*/

export default function App() {
  const [order, setOrder] = useState("createdAt"); // 최신순, 베스트순
  const [items, setItems] = useState([]); // reviews 값
  const [offset, setOffset] = useState(0); // offset
  const [hasNext, setHasNext] = useState(false); // 다음값 있는지 여부
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);
  // 커스텀 훅 - pending, error, wrappedFunction
  const [locale, setLocale] = useState("ko");

  const sortedItems = items.sort((a, b) => b[order] - a[order]); // 내림차순 정렬

  const handleNewestClick = () => setOrder("createdAt"); // 최신순

  const handleBestClick = () => setOrder("rating"); // 베스트순

  const handleDelete = async (id) => {
    // ReviewList를 호출해서 id에 해당하는 값을 삭제
    const result = await deleteReview(id);
    // 삭제가 안되면 종료
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    // setItems에서 prevItems 배열에서 id와 일치하지 않는 아이템의 id 항목만 필터링하여 새로운 배열을 생성
  };

  const handleLoad = useCallback(
    async (options) => {
      // 처음 화면 렌더링 될 때 데이터를 불러주기 위해서 만든 함수 => useEffect랑 같이 쓰려고 만든 함수
      // options => {order: 'createdAt', offset: 0, limit: 6} 초기페이지 로딩
      const result = await getReviewsAsync(options); // 커스텀훅 호출해서 options 인수로 넣어줌
      if (!result) return;

      const { paging, reviews } = result;
      if (options.offset === 0) {
        setItems(reviews);
      } else {
        setItems((prevItems) => [...prevItems, ...reviews]);
      }
      setOffset(options.offset + options.limit);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );
  // useCallback - 첫번째 인수로는 고정할 함수를 두번째 인수로는 의존성배열 - 그럼 리턴값으로 함수를 리턴해 줌
  // 이때 의존성 배열은 useCallback에 전달한 함수를 언제 새로 생성할 지 판단하는 기준이 됨
  // useCallback을 사용하면 함수를 기억해 두기 때문에 의존성 배열이 그대로라면 함수를 새로만들지 않고 재사용함
  // 이제는 무한루프 발생하지 않지만 오류 하나 더 나옴 - 의존성 배열에 getReviewsAsync 함수가 빠졌다
  // useCallback 함수 안에서 바깥으로 참조하는 값은 getReviewsAsync, setItems, setOffset, setHasNext임
  // 이중 리액트에서 제공하는 setter 함수는 의존성 배열에 추가할 필요없음 그럼 getReviewsAsync 추가
  // 근데 getReviewsAsync도 반복 매번새로만드는건지 확인해 보니까 useAsync로 가보자

  const handleLoadMore = async () => {
    // 더보기 눌렀을때 같을 더 불러오기 위해서 만든 함수
    // offset 값을 동적변수?로 만들어서 자유롭게 값이 바뀔 수 있도록 함
    await handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    // 이벤트 핸들러 => review 값 받아와서 이전값 앞에 생성
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    // 이벤트 핸들러 => review 값 받아와서 수정 하기
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
        // 두번째 인수 안주면 인수 부터 끝까지
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
    // 화면이 렌더링 되자마자 실행할 handleLoad 함수 호출
    // defendency array 의존성 배열로 order 값이 바뀌면 다시 처음부터 호출 되도록 만듬
  }, [order, handleLoad]);
  // 콘솔창에 오류나서 시키는 대로 handleLoad함수 넣었는데 => 무한루프 발생
  // 이유 -  의존성 배열에는 함수 넣으면 무한루프 발생함
  // 다시 콘솔창에 오류 발생 => 무한루프 발생하니까 useCallback 훅을 사용해라
  // 이유 - 처음 렌더링되고 useEffect가 실행되면 state값이 바뀌어서 다시 렌더링 되는데
  // 이때 handleLoad함수도 다시 만들기 때문에 의존성 배열의 값이 달라짐 그래서 무한루프 발생

  return (
    <LocaleContext.Provider value={locale}>
      <div>
        <LocaleSelect value={locale} onChange={setLocale} />
        <div>
          <button onClick={handleNewestClick}>최신순</button>
          <button onClick={handleBestClick}>베스트순</button>
        </div>
        <ReviewForm
          onSubmit={createReview}
          onSubmitSuccess={handleCreateSuccess}
        />
        <ReviewList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateReview}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
    </LocaleContext.Provider>
  );
}
