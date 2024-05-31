import "./ReviewList.css";

export default function ReviewList({ items, onDelete }) {
  console.log(items);
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <ReviewListItem item={item} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

function ReviewListItem({ item, onDelete }) {
  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}