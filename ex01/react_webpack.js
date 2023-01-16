/*
리액트를 프로덕션에 사용하려고 한다면 고려해야 할 것이 정말 많다.
JSX 와 ESNext 의 변환을 어떻게 처리해야 할까? 프로젝트의 의존 관계를 어떻게 관리해야 할까?

위 질문을 해결해주는 여러 도구가 있는데, 브라우저리파이, 걸프, 그런트, 프리팩 등이 대표적이다.
웹팩또한 주도적인 도구중 하나로 떠오르고 있는 추세이다.
웹팩 생태계는 성숙되어있고, create-react-app, 개츠비, 코드 샌드박스와 같은 도구도 포함한다.

웹팩은 모듈 번들러로 알려져이쓴데, 모듈 번들러는 여더 다른 팡리들(JS, LESS, CSS, JSX, ESNext 등)을 받아서 한파일로 묶어준다.
모듈을 하나로 묶어서 얻는 2가지 이익은 모듈성과 네트워크 성능이다.

1. 모듈성은 소스코드를 작업하기 쉽게 여러 부분 또는 모듈로 나눠서 다루루 수 있게 해준다. 특히 팀 환경에서 모듈성이 중요하다.
   의존 관걔가 있는 여러 파일들을 묶은 번들을 브라우저가 한 번만 읽기 때문에 네트워크 성능이 좋아진다.
   각 script 태그들은 HTTP 요청을 만들어내는데, 약간의 시간 지연이 발생하기 마련이다.
   이 때 모든 의존관계를 한 파일에 넣으면 모든 파일을 단 한번의 HTTP 요청으로 가져올 수 있으므로 추가 시간지연을 막을 수 있다.

컴파일 이외에 웹팩이 처리할 수 있는 일은 다음과 같다.
  * 코드분리: 코드를 여러 덩어리로 나눠서 각각 따로 로딩할 수 있다. 이를 롤업이나 레이어라고 부름.
    코드를 여러 페이지나 디바이스에서 필요한 자원을 따로 나눠서 더 효율적으로 처리하기 위함이다.
  * 코드축소: 공백, 줄바꿈, 긴 변수 이름, 불필요한 코드 등을 없애서 파일크기를 줄여준다.
  * 특징켜고끄기: 코드의 기능을 테스트해야 하는 경우 각각의 환경에 맞춰 보내준다.
  * HMR(hot module replacement): 소스 코드가 바뀌는지 감지해서 변경한 모듈만 즉시 갱신해준다.

웹팩과 같은 도구를 사용해 클라이언트 자바스크립트를 정적으로 빌드하면 대규모 웹 애플리케이션을 여러 팀원들이 함께 개발할 수 있다.
웹팩 모듈 번드러를 사용하면 다음과 같은 장점을 가진다.
  * 모듈성: 모든 패턴을 모듈화하여 각 필요한 부분에서 임포트하여 사용할 수 있게 된다
  * 조합: 모듈을 사용하여 효율적으로 앱을 구축하고 작고 단순하며, 재사용하기 쉬운 리액트 컴포넌트를 구축할 수 있다. 또한 유지보수면에서도 편리하다.
  * 속도: 여러 파일을 HTTP 로 요청함에 따라 발생할 수 있는 시간 지연이 없어져서 앱 로딩시간이 빨라진다.
  * 일관성: 웹팩이 JSX 나 JS 를 컴파일해주기 때문에 아직 표준화되지 않은 미래의 문법을 사용할 수 있다. 따라서 웹팩의 환경안에서는 계속해서 최신 문법을 사용할 수 있다.
*/