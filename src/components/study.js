/**
 * 다양한 css 기술 알아보기
 */

// BEM (Block Element Modifier)
// BEM은 CSS 클래스 이름을 짓는 규칙입니다. 블록(Block), 요소(Element), 변경자(Modifier) 형태로 씀
// .block__element--modifier 형태로 씀

// 예시

{
  /* <form class="signin-form">
  <label class="signin-form__label">
    Email
    <input type="text" class="signin-form__input">
  </label>
  <label class="signin-form__label">
    Password
    <input type="password" class="signin_form__input signin_form__input--pasword">
  </label>
  <button class="signin-form__button signin-form__button--submit">
    Sign In
  </button>
</form> */
}

// .signin-form { /* 로그인 폼 */ }

// .signin-form__input { /* 로그인 폼의 인풋 */ }

// .signin-form__input.signin-form__input--password { /* 로그인 폼의 비밀번호 인풋 */ }

// .signin-form__button { /* 로그인 폼의 버튼 */ }

// .signin-form__button.signin-form__button--submit { /* 로그인 폼의 제출 버튼 */ }

/**
 * 참고자료
 * https://naradesign.github.io/bem-by-example.html
 * https://css-tricks.com/bem-101/
 * https://en.bem.info/methodology/quick-start/
 * https://getbem.com/introduction/
 */

// css 기술
// sass(scss)
// css Module
// css in js
// tailwind css
