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

/**
 * 예를 들어서 웹사이트에 로그인한다고 해 보면
 * 로그인을 성공적으로 하고 나면 서버는 클라이언트에 일종의 인증서 같은 걸 보내줌
 * 클라이언트가 이걸 가지고 오면 어떤 사람인지 구분하는데 사용함
 * 클라이언트는 리퀘스트를 보낼 때마다 이 인증서를 리퀘스트에 함께 포함해서 보내야 하는데
 * 이럴 때 사용하는 것이 쿠키(Cookie) 임
 * 로그인에 성공했을 때 서버가 Set-Cookie 헤더로 쿠키 값을 보내주면 이걸 클라이언트가 저장해 두었다가,
 * 서버에 리퀘스트를 보낼 때마다 매번 Cookie 헤더로 보내서 로그인 된 상태라는 걸 표시함
 * 웹 브라우저를 껐다 키거나 컴퓨터를 껐다 키더라도 쿠키 값은 유지되기 때문에 평소에 우리가 사이트를 한 번 로그인하면,
 * 일정 기간 동안은 로그인하지 않아도 로그인이 유지됨
 *
 * 특징
 * - 서버로부터 리스폰스로 쿠키를 받으면, 클라이언트에서는 별도로 작업을 해주지 않아도 알아서
 * 웹 브라우저가 알아서 저장하고 리퀘스트를 보낼 때도 웹 브라우저가 알아서 보냄
 * - 자바스크립트를 통해서 쿠키 값을 추가, 수정, 참조할 수 있음
 * - 수명을 지정할 수 있음 수명이 다한 쿠키는 알아서 지워짐
 */

// 알아두면 좋은 Attribute
/**
 * Domain
 * 브라우저가 쿠키를 보낼 도메인을 지정합니다.
 * 예를 들어서 Domain=codeit.kr 이라고 하면 https://codeit.kr 은 물론이고 https://abc.codeit.kr,
 * https://xyz.abc.codeit.kr 같은 서브 도메인에 리퀘스트를 할 때도 쿠키를 보냄
 *
 * Path
 * 브라우저가 쿠키를 보낼 경로를 지정합니다.
 * 예를 들어서 Path=/ 라고 하면 / 아래에 있는 경로들, /abc, /abc/xyz 같은 경로에 리퀘스트를 보낼 때에도 모두 쿠키를 보냄
 *
 * HttpOnly
 * document.cookie 값을 자바스크립트로 사용할 수 있으면, 해커들이 악성 코드를 사용자들에게 유포해 쿠키를 훔칠 수 있음!!
 * (게시판에 자바스크립트를 올려서 쿠키를 탈취하는 Cross-Site Scription 사례)
 * https://kciter.so/posts/basic-web-hacking/#cross-site-scription-xss
 * 로그인 정보 같은 민감한 정보는 되도록이면 자바스크립트로 조작하면 안됨
 * HttpOnly 를 사용하면 쿠키를 자바스크립트로 사용하지 못하게 막을 수 있음
 *
 * Secure
 * Secure 를 지정하면 HTTPS 리퀘스트를 보낼 때만 쿠키를 보냄
 * 참고로 SameSite=None 을 지정하면 반드시 Secure 도 함께 지정해야 함
 *
 * SameSite
 * 이러한 공격을 크로스 사이트 요청 위조 (Cross-site request forgery, CSRF, XSRF)라고 함
 * XSRF를 방지하기 위해서 제3자 사이트(Third-party site)에서 쿠키를 보내지 못하게 SameSite 를 지정해야 함
 * SameSite 속성의 값에는 Strict, Lax (아무것도 지정하지 않았을 때 기본값), None이 있음
 *
 * Expires 와 Max-Age
 * 쿠키의 수명을 지정하는 속성임
 * Expires로 만료될 시기를 지정하거나, Max-Age 로 쿠키의 수명을 지정할 수 있음
 * 세션 쿠키(Session Cookie)는 Expires 나 Max-Age 를 지정하지 않으면 만들 수 있음
 * 세션 쿠키는 브라우저를 닫으면 지워지는 쿠키임
 * 영속적인 쿠키(Persistent Cookie)는 Expries 나 Max-Age 로 수명을 지정해서 만들 수 있음 수명이 다하면 지워지는 쿠키입니다.
 *
 * 참고자료
 * https://www.youtube.com/watch?v=OpoVuwxGRDI
 * https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies
 * https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Set-Cookie
 * https://seob.dev/posts/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%BF%A0%ED%82%A4%EC%99%80-SameSite-%EC%86%8D%EC%84%B1/
 * https://blog.pumpkin-raccoon.com/80
 * https://owasp.org/www-community/attacks/csrf
 */

// 세션 스토리지와 로컬 스토리지
/**
 * 쿠키는 서버에서 만들고, 클라이언트는 거의 건드리지 않는다고 했음
 * 그런데 사이트에 따라서는 클라이언트에서만 사용하는 데이터인데, 저장해 놓고 사용하고 싶은 경우가 있음
 * 이런 목적으로 나온 것이 바로 세션 스토리지(Session Storage)와 로컬 스토리지(Local Stroage)가 있음
 */

// 세션 스토리지
// 현재 탭에서만 유효한 저장소임
// 탭을 닫으면 데이터가 사라짐
// 다른 탭과 데이터는 공유되지 않음
// 예를 들어서 현재 탭의 인풋의 값을 저장하고 참조하는 코드는 다음과 같음 참고로 저장하는 데이터의 타입은 문자열임

// 값을 저장하는 코드. (이미 값이 있다면) 수정하는 코드
// const data = inputElement.value;
// sessionStorage.setItem('draft', data);

// 값을 참조해서 사용할 때
// const draftData = sessionStorage.getItem('draft');

// 값 지우기
// sessionStorage.removeItem('draft');

// 로컬 스토리지
// 해당 사이트에서 유효한 저장소임
// 탭을 닫거나 브라우저를 닫아도 데이터가 유지됨
// 여러 탭 사이에서도 데이터가 공유됨
// 예를 들어서 사이트의 사이드 바 보이기/감추기 정보를 저장하고 참조하는 코드는 다음과 같음
// 문자열 형태로 저장하고 문자열을 원하는 데이터 타입으로 바꿔야 한다는 점도 생각

// 사용자가 사이드바 감추기 버튼을 클릭했을 때
// 값을 저장, 수정
// localStorage.setItem('show-sidebar', 'false');

// 사용자가 처음 접속했을 때
// const showSidebar = localStorage.getItem('show-sidebar') === 'true';

// 값 지우기
// localStorage.removeItem('show-sidebar');

// 결론
// 쿠키와 세션, 로컬 스토리지의 다른 점?
// 클라이언트가 만들고 관리하는 데이터
// 자바스크립트로 편리하게 조작할 수 있다
// 만료 기간(수명)이 없다
// 쿠키보다 사용할 수 있는 용량이 크다

// 스토리지가 변경되었을 때 처리하기
// 스토리지가 변경되었을 때 'storage' 라는 이벤트가 발생합니다.

// window.addEventListener("storage", () => {
//   const showSidebar = localStorage.getItem('show-sidebar') === 'true';
//     // showSidebar 값 적용하기
// });
// https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event

// 참고자료
// https://developer.mozilla.org/ko/docs/Web/API/Web_Storage_API
// https://web.dev/articles/storage-for-the-web?hl=ko
// https://ko.javascript.info/localstorage

// 쿠키의 활용사례
// 1. 로그인
// (세션 기반 인증의 경우) 처음에 세션 ID를 쿠키로 보내 줌
// 로그인에 성공하면 서버 쪽에서 세션 상태를 업데이트 함
// (토큰 기반 인증의 경우) 로그인에 성공하면 서버가 토큰을 발급해 쿠키로 보내 줌
// 세션 기반, 토큰 기반 인증에 대해서 살펴보기 https://www.codeit.kr/topics/user-system-theory

// 2. 하루동안 팝업 다시 보지 않기
// 사용자가 ‘하루 동안 다시 보지 않기’를 체크하고 닫으면 클라이언트가 수명이 1일인 쿠키를 만듬
// 다음에 접속했을 때는 이 쿠키를 확인해서 팝업을 보여주지 않음
// ❓만약 로컬 스토리지로 구현한다면 어떻게 할 수 있을까? (https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/)

// 3. 장바구니
// (세션 기반 인증을 사용하는 경우) 처음 세션 ID를 쿠키로 보내 줌
// 이 세션 ID를 기반으로 서버에서 장바구니 정보를 저장함
// ❓로컬 스토리지로 구현하면 어떻게 구현할 수 있을까? 
// 로컬 스토리지로 구현했을 때와 세션 기반으로 구현할 때 어떤 차이점, 장단점이 있을까요? 
// https://www.codehim.com/demo/javascript-shopping-cart-with-local-storage/

// 세션 스토리지, 로컬 스토리지
// 1. 초안(draft) 임시 저장하기
// 텍스트를 입력하다가 실수로 창을 닫아 버리더라도 내용이 남아있게 할 수 있습니다.
// https://stackedit.io/
// 로컬 스토리지를 사용해 구현할 수 있음
// 실제로는 로컬 스토리지와 유사하지만 좀 더 데이터베이스처럼 쓸 수 있는 IndexedDB로 구현되어 있습니다.

// https://slack.com/intl/ko-kr/
// 채팅창에 입력하다가 창을 닫더라도 내용이 저장됨
// 기본적으로 초안을 로컬 스토리지에 저장함
// 주기적으로 서버에도 초안을 저장함 그래서 모바일 앱에서도 초안을 확인할 수 있음

// 2. 웹 앱
// 웹 기반으로 만들어진 프로그램(웹 앱)들은 세션, 로컬 스토리지를 적극적으로 사용합니다.
// https://app.diagrams.net/
// 온라인에서 다이어그램을 그리는 프로그램.
// 프로그램을 사용하면서 유지해야 할 각종 설정 값을 로컬 스토리지에 저장하고 있음
// 예시: 테마를 바꾸고 로컬 스토리지의 .drawio-config 를 확인해보자

// https://www.figma.com/
// 웹 기반으로 만들어진 디자인 협업 도구임
// 예시: 피그마에서 로컬 스토리지의 show-sidebar 의 값을 0 또는 1로 바꿔보자

// https://www.notion.so/
// 로컬 스토리지에 굉장히 많은 데이터를 저장 중
// LRUCache를 로컬 스토리지에 저장하는 것으로 같음 
// 쉽게 말해서 자주 쓰는 데이터를 로컬 스토리지에 캐싱해두는 용도로 사용 중인 걸로 보임
