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
  itmes.map((ingredient, i) =>
    React.createElement("li", { key: i }, ingredient)
  )
);

JSX 에 대해서 공부할 때 키에 대해 더 공부하도록 하자.


*/
