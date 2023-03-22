// Code sandbox 를 활용하여, react App 을 생성하기 전에 실시간으로 변화하는 테스트가 가능함.
// 온라인이기 때문에 로그인만 하면 바로 가능!
// https://codesandbox.io/ 참고

// hooks 은 react 의 state machine 에 연결하는 기본적인 방법이다. -> 모든것이 함수형 프로그래밍으로 변환가능해짐

// hooks 등장 동기
//    1. 컴포넌트 사이에서 상태 로직을 재사용하기 어려움 -> hooks 은 계층의 변화 없이 상태 관련 로직을 재사용 할 수 있도록 도와줌
//    2. 복잡한 컴포넌트들을 이해하기 어려움 -> 상태 관련 로직을 위해서 컴포넌트들을 작게 분리하는 것이 불가능함
//    => hooks 를 통해 서로 비슷한 작동을 하는 작은 함수들을 묶음(구독 설정 및 데이터를 불러오는 거소가 같은 로직)
//    3. class 는 사람과 기계를 혼동시킴 -> class 사용을 위해서는 다른 언어와 다르게 작용하는 JS 의 this 를 이해해야 함
//    따라서 hooks 을 사용함으로서 함수형 프로그래밍이 가능함

// 1. useState 에 관하여...
//    useState 는 초기상태와 변한상태, 그리고 초기값을 셋팅할 수 있는 옵션들을 제공한다.
//    useState 를 통해 초기값을 설정하고, 변경된 값을 현재 값으로 간단하게 변경해준다.


// publishing 하기
// publishing 할 hooks 의 폴더를 따로 생성한다.
// npm init 을 실행한다.
// @woos~/ 형식으로 패키지 네이밍
// 그 후 줄줄이 실행하고, keywords 를 입력 (ex. hooks, react, title 입력)
// 그리고 package.json 을 확인해 본다 -> main 이 제대로 존재하는지 확인
// react i react react-dom 실행하여 제대로 불러오는지 확인
// dependencies 에서 확인!

// npm 사이트에서 확인 가능
// npm login
// npm publish --access public

// 그 후 import 시 @woos~/ 형식으로 저장한 url 을 주면됨!