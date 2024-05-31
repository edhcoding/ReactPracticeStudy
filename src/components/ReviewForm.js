import { useState } from "react";
import "./ReviewForm.css";

export default function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
  });

  const handleChange = (e) => {
    setValues((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <input name="rating" type="number" value={values.rating} onChange={handleChange} />
      <textarea name="content" value={values.content} onChange={handleChange} />
      <button type="submit">확인</button>
    </form>
  );
}
