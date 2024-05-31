import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import { getReviews } from "../api";

export default function App() {
  const [order, setOrder] = useState("createdAt");

  const [items, setItems] = useState([]);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");

  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (order) => {
    const { reviews } = await getReviews(order);
    setItems(reviews);
  };

  useEffect(() => {
    handleLoad(order);
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}
