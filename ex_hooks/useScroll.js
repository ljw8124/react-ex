// 스크롤을 감지해서 변화를 주는 hooks
const useScroll = () => {
  const [state, setState] = useState({ x: 0, y: 0 });
  
  const onScroll = () => {
    // x 값과 y 값 구조분해 할당
    setState({x: window.scrollX, y: window.scrollY});
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    // addEventListener 를 해줬으면 remove 해주어야 함
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  return state;
};

export default function App() {
  const { y } = useScroll();
  return (
      <div className="App" style={{ height: "1000vh" }}>
        <h1
            style={{
              color: y > 100 ? "red" : "blue",
              position: "fixed"
            }}
        >
          Yellow
        </h1>
      </div>
  );
}
