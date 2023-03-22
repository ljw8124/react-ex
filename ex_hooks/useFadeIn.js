// hooks 을 이용하여 애니메이션 효과를 주는 방법
const useFadeIn = (duration = 1, delay = 0) => {  // 주어지지 않은 경우 초기값을 설정
  if (typeof duration !== "number" || typeof delay !== "number") return;
  const element = useRef();
  // useRef 기능
  //  1. 저장공간(변수 관리)
  //  2. DOM 요소에 접근
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;  // CSS 의 ease-in-out 을 이용할 수도 있다.
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};

export default function App() {
  const fadeInH1 = useFadeIn(1, 2);
  const fadeInP = useFadeIn(5, 10);
  return (
      <div className="App">
        <h1 {...fadeInH1}>Hello</h1>
        <p {...fadeInP}>testtttttt.....</p>
      </div>
  );
}
