import { useEffect, useState } from "react";
import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

const LIMIT = 6;

export default function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);

  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]); // 내림차순

  const handleNewestClick = () => setOrder("createdAt"); // 최신순

  const handleBestClick = () => setOrder("rating"); // 베스트순

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    // 왼쪽의 item.id는 현재 요소의 id 속성, 오른쪽 id는 매개변수로 item.id가 들어옴 다른 item인데
    // 위에 items= {sortedItems} 에서 배열이 정리된후의 요소의 id 속성 - 이해한 바가 맞다면
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
    // order가 변할때 마다 호출하려고 하기 때문에
    // { order, offset: 0, limit: LIMIT } offset 값도 상태변수가 아니라 초기값을 로드하게 0으로 설정해줌
  }, [order]);

  const handleLoad = async (options) => {
    // api 호출
    // 매개변수 options는 { order, offset, limit: LIMIT } 이거임
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { paging, reviews } = result; // 잘받아와지면 result 변수에 담고 network탭에서 확인하면 paging, reviews 속성이 있음
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
      // 이 콜백 함수는 이전 상태 값을 인수로 받습니다 그러므로 offset이 0일때의 items state 값이 prevItems로 받음
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewForm />
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}
