/*
리액트를 사용할 때는 JSX 로 앱을 만들 가능성이 커진다.
https://ko.reactjs.org/docs/introducing-jsx.html 참고

리액트를 이해하기 위해서는 가장 핵심이 되는 단위인 리액트 앨리먼트를 이해할 필요가 있다.
CDN 방식으로 리액트 라이브러리를 가져올 수도 있다.
ex. <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js></script>

위 방식이 리액트를 사용하기 위한 최소한의 요구사항이다.

오류와 경고 메시지를 모두 브라우저 콘솔에서 보기 위해서는 리액트 개발자 버전을 사용해야할 것이다.
react.production.min.js 와 react-dom.production.min.js 가 있다.

HTML 를 이루는 엘리먼트는 브라우저가 HTML 문서를 읽어들이면 DOM 엘리먼트가 되고, 이 DOM 이 사용자 인터페이스를 화면에 표시한다.
Ajax 의 등장으로 단일페이지 애플리케이션(SPA)가 나타났다.

리액트는 브라우저 DOM 을 갱신해주기 위해 만들어진 라이브러리다.
리액트가 모든 처리를 대신 해주기 때문에 더 이상 SPA 를 효율적으로 만들기 위해 여러 복잡한 내용을 신경쓸 필요가 없어졌다.
리액트에서는 코드로 DOM API 를 직접 조작하지 않는다. 대신 리액트에서 어떤 UI 를 생성할지 지시하면,
리액트가 우리 명령에 맞춰 원소 랜더링을 해준다.

ex. React.createElement("h1", { id: "recipe-0" }, "구운 연어" );

랜더링 과정에서 리액트는 이 엘리먼트를 실제 DOM 엘리먼트로 반환한다.

-ReactDOM
ReactDOM 에는 리액트 엘리먼트를 브라우저에 렌더링하는데 필요한 모든 도구가 들어있다.
그 중 하나가 render 메서드이다.

리액트 16 버전 이전에는 DOM 에서 한 엘리먼트만 렌더링할 수 있었지만, 현재의 리액트는 배열을 렌더링할 수 있다.

ex.
const dish = React.createElement("h1", null, "구운 연어");
const dessert = React.createElement("h2", null, "코코넛 크림 파이");

ReactDOM.render([dish, dessert], document.getElementById("root"));

-자식들
리액트는 props.children 을 사용해 자식 엘리먼트들을 렌더링한다.
텍스트가 아닌 다른 리액트 엘리먼트들을 자식으로 렌더링할 수도 있고, 그렇게 하면 엘리먼트 트리가 생긴다.
엘리먼트 트리에는 루트 엘리먼트가 하나 존재하고, 루트 아래로 많은 가지가 자란다. 그래서 트리라고 불린다.

React.creatElement(
  "ul",
  null,
  React.creatElement("li", null, "연어 900 그램"),
  React.creatElement("li", null, "신선한 로즈마리 5가지),
  React.creatElement("li", null, "올리브 오일 2테이블스푼"),
  React.creatElement("li", null, "작은 레몬 2조각"),
  React.creatElement("li", null, "코셔 소금 1 티스푼"),
  React.creatElement("li", null, "다진 마늘 4쪽")
);

* 리액트에서는 className 을 class 라는 식으로 표현하지 못한다.
  그 이유는 알다시피 class 라는 예약어가 이미 존재하기 때문이다.
  그래서 class 에 이름을 부여하고 싶을 때는 className 을 사용한다.

데이터를 가지고 엘리먼트를 만들수도 있는데, 이 때 사용하는 것이 map 이다.

ex.
React.createElement(
  "ul",
  { className: "ingredients" },
  items.map(ingredient => React.createElement("li", null, ingredient))
);

하지만 위 방식은 에러가 나오는데, 리스트를 만드는 경우 각 자식 엘리먼트의 key 프로퍼티를 넣는 것을 권장하기 때문이다.
리액트는 key 를 사용해 DOM 을 더 효율적으로 갱신할 수 있다.

React.createElement(
  "ul",
  { className: "ingredients" },
  items.map((ingredient, i) =>
    React.createElement("li", { key: i }, ingredient)
  )
);

JSX 에 대해서 공부할 때 키에 대해 더 공부하도록 하자.

- 리액트 컴포넌트
모든 사용자의 인터페이스는 여러 부분으로 이뤄진다. 기계로 예를 들자면, 여러 부품이 모여서 한 제품을 이루는 것과 비슷하다.
리액트에서는 이런 각 부분을 '컴포넌트' 라고 한다.

컴포넌트를 적절하게 사용하면 서로 다른 데이터 집합에 대해 같은 DOM 구조를 재사용할 수 있다.

리액트는 함수를 작성해 컴포넌트를 만든다. 함수는 사용자 인터페이스에서 재활용할 수 있는 부품을 반환한다.

ex)
const secretIngredients = [
  "무염 버터 1컵",
  "크런치 땅콩 버터 1컵",
  "흑설탕 1컵",
  "백설탕 1컵",
  "달걀 2개",
  "일반 밀가루 2.5컵",
  "베이킹 소다 1티스푼",
  "소금 0.5티스푼"
];

function IngredientsList() {
  return React.createElements(
    "ul",
    { className: "ingredients" },
    items.map((ingredient, i) => {
      React.createElement("li", { key: i }, ingredient)
    });
  )
}

그 후 secretIngredients 를 items 라는 프로퍼티로 넘긴다.

ReactDOM.render(
  React.createElement(IngredientsList, { items: secretIngredients }, null),
  document.getElementById("root")
);

이런식으로 컴포넌트를 만들면 더 유연한 컴포넌트를 만들 수 있다.

전역으로 매핑하는 것이 아니라 파라미터로 넘겨서 코드를 작성하는 것이 좋다.

function IngredientsList({ items }) {
  return React.createElements(
    "ul",
    { className: "ingredients" },
    items.map((ingredient, i) => {
      React.createElement("li", { key: i }, ingredient)
    });
  )
}

createClass 와 클래스 컴포넌트를 걸치면서 지금의 방식이 등장하였다.

- JSX 를 사용하는 리액트
JSX 는 JS 와 xml 의 합성어이다. JSX 는 단지 복잡한 createElement 호출에서 빠트린 콤마를
찾느라고 고생하지 않아도 편하게 리액트 엘리먼트를 만들 수 있게 해주는 방법 중의 하나이다.

- JSX 로 리액트 엘리먼트 정의하기
JSX 는 속성이 붙은 복잡한 DOM 트리를 작성할 수 있는 간편한 문법을 제공한다.
JSX 에서는 태그를 사용해 엘리먼트의 타입을 지정한다. 태그의 속성은 프로퍼티를 표현한다.
여는 태그와 닫는 태그 사이에 엘리먼트의 자식을 넣는다.

자료 배열을 컴포넌트에 넘길 때는 중괄호로 감싸야 한다. 이렇게 중괄호로 감싼 코드를 자바스크립트 식이라고 부른다.
JSX 에서 컴포넌트에게 프로퍼티 값으로 자바스크립트 값을 넘기려면 자바스크립트 식을 꼭 사용해야 한다.
이 때 컴포넌트의 프로퍼티는 문자열과 자바스크립트 식의 2가지 유형이 있다.
자바스크립트 식에는 배열, 객체, 함수 등 포함된다. 배열, 객체, 함수 등의 자바스크립트 값을 포함시키려면
자바스크립트 값 주변을 중괄호로 감싸야만 한다.

- JSX 팁
HTMl 과 유사해 보이는망큼 대부분 문법은 HTML 과 비슷하다.

* 내포된 컴포넌트
JSX 에서는 다른 컴포넌트의 자식으로 컴포넌트를 추가할 있다. 예를 들어 Ingredients 안에 Ingredient 를 여러번 추가할 수 있다.

* className
자바스크립트에서 class 가 예약어이므로 class 속성 대신 className 을 사용한다.
ex. <h1 className="fancy">구운연어</h1>

* 자바스크립트 식
중괄호로 자바스크립트 식을 감싸면 중괄호 안의 식을 평가해서 결과값을 사용해야 한다는 뜻이다.
ex. <h1>{title}</h1>

문자열이 아닌 다른 타입의 값도 자바스크립트 식으로 넣을 수 있다.
<input type="checkbox" defaultChecked={false} />

* 평가
중괄호 안에 들어간 자바스크립트 코드는 그 값을 평가한다. 즉, 중괄호안에 사칙연산이 있거나 다른 함수가 있다면 그 결과값이 호출된다는 의미이다.
ex. <h1>{"Hello" + title}</h1>
    <h1>{title.toLowerCase().replace}</h1>

- 배열을 JSX 로 매핑하기
JSX 는 자바스크립트이므로 자바스크립트 함수 안에서 JSX 를 직접 사용할 수 있다.
ex.
<ul>
  {props.ingredients.map((ingredient, i) => {
    <li key={i}>{ingredient}</li>
  });
</ul>

- 바벨
대부분의 언어들은 컴파일 방식이지만, 자바스크립트의 경우 인터프리터 형식으로 브라우저가 코드 텍스트를 해석한다.
하지만 모든 브라우저가 최신 자바스크립트를 지원하지 않고, 어떤 브라우저는 JSX 를 지원하지 않는다.
우리는 JSX 와 자바스크립트 최신 문법을 사용하고 싶으므로, 코드를 브라우저가 해석할 수 있는 코드로 변환시켜주는 작업이 필요한데,
이런 변환 과정을 컴파일링이라고도 하며 바벨이 그런 역할을 해준다.

과거에는 JSX 변환기가 JSX 를 처리하는 표준적인 방식이었지만, 이제는 바벨이 JSX 처리 표준이다.

가장 간단한 바벨 사용방법은 CDN 링크를 직접 HTML 에 포함시키는 것이다. 이렇게 하면 "test/babel" 인 script 블록을 바벨이 컴파일해준다.
이 방법은 프로덕션에 사용할 수 있는 가장 좋은 방법은 아니지만, JSX 를 처음 시작하기 아주 편한 방법이다. -> temp.html 참고

* 브라우저에서 바벨을 사용하면 발생하는 콘솔 경고
브라우저내 변환기를 사용하면 프로덕션 환경에서는 스크립트를 미리 컴파일해 사용하라는 경고를 볼 수 있다.
여기 있는 코드나 그와 비슷한 목적의 데모의 경우에는 이 경고를 무시해도 좋다.
transformScriptTags.ts:252 You are using the in-browser Babel transformer. Be sure to precompile your scripts for production - https://babeljs.io/docs/setup/

JSX 의 단점은 브라우저가 JSX 를 해석하지 못한다는 점이다. 따라서 JSX 는 순수 리액트로 변경해야 한다.





*/
