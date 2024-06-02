import { useState } from "react";
import useAsync from "../hooks/useAsync";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";
import useTranslate from "../hooks/useTranslate";

const INITIAL_VALUES = {
  imgFile: null,
  title: "",
  rating: 0,
  content: "",
};

export default function ReviewForm({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onCancel,
  onSubmit,
  onSubmitSuccess,
}) {
  const t = useTranslate();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  // pending, error, wrappedFunction

  const handleChange = (name, value) => {
    // 함수의 상태를 업데이트 하는 로직에 집중
    // 재사용성 증가
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    // 이벤트 핸들러로써의 역할에 집중
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 새로고침과 제출을 동시에 하기 때문에 새로고침 기능을 꺼줌
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);
    // append는 두 개의 인수만 받기 때문에 한줄로 작성 불가능

    const result = await onSubmitAsync(formData);
    // api의 createReview 함수에 formData 전달
    if (!result) return;

    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      {onCancel && <button onClick={onCancel}>{t("cancel button")}</button>}
      <button disabled={isSubmitting} type="submit">
        {t("confirm button")}
      </button>
      {submittingError && <div>{submittingError.message}</div>}
    </form>
  );
}
