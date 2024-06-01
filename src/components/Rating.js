import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

export default function Rating({
  className,
  value = 0,
  onSelect,
  onHover,
  onMouseOut,
}) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {/* 별 5개를 통틀어서 감싸는 div 이기 때문에 여기에 클래스랑 onMouseOut 속성을 준거임 - onMouseOut: 마우스가 나갔을 경우 */}
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating} //value는 이미 데이터에 있는 평점 rating이 우리가 줄 평점??
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

function Star({ selected = false, rating = 0, onSelect, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;
  // onSelect prop이 존재할 때만 적용
  // 이하 동문

  const handleMouesOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouesOver}
      // onMouseOver: 마우스를 올렸을 경우
    >
      ★
    </span>
  );
}
