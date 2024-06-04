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