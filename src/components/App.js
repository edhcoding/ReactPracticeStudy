import ReviewList from "./ReviewList";
import items from "../mock.json";

export default function App() {
  return (
    <div>
      <ReviewList items={items} />
    </div>
  );
}
