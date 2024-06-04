import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListPage from "../components/ListPage";
import Warn from "../components/Warn";
import CourseItem from "../components/CourseItem";
import { getCourses } from "../api";
import styles from "./CourseListPage.module.css";
import searchBarStyles from "../components/SearchBar.module.css";
import searchIcon from "../assets/search.svg";

function CourseListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // useState랑 비슷
  const initKeyword = searchParams.get("keyword");
  // searchParams는 get메서드로 값을 가져올 수 있음
  const [keyword, setKeyword] = useState(initKeyword || "");
  // keyword state는 input에다가 value로 넘겨줄 거기 때문에 문자열이어야함
  // 따라서 문자열이 없는 경우에는 빈문자열 출력하게 해줘야함
  const courses = getCourses(initKeyword);

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(keyword ? { keyword } : {});
    // set 함수로는 주소창의 쿼리 스트링값을 변경할 수 있음
    // 객체에다가 원하는 파라미터를 프로퍼티로 넣어서 전달하면 주소창의 쿼리스트링도 변경가능
  };

  return (
    <ListPage
      variant="catalog"
      title="모든 코스"
      description="자체 제작된 코스들로 기초를 쌓으세요."
    >
      <form className={searchBarStyles.form} onSubmit={handleSubmit}>
        <input
          name="keyword"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="검색으로 코스 찾기"
        ></input>
        <button type="submit">
          <img src={searchIcon} alt="검색" />
        </button>
      </form>

      <p className={styles.count}>총 {courses.length}개 코스</p>

      {initKeyword && courses.length === 0 ? (
        <Warn
          className={styles.emptyList}
          title="조건에 맞는 코스가 없어요."
          description="올바른 검색어가 맞는지 다시 한 번 확인해 주세요."
        />
      ) : (
        <div className={styles.courseList}>
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      )}
    </ListPage>
  );
}

export default CourseListPage;
