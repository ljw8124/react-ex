// 페이지를 나가기 전 (마우스가 이탈하기 전) 에 호출하도록 하는 함수
const useBeforeLeave = (onBeforeLeave) => {
  if (typeof onBeforeLeave !== "function") return;
  
  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) onBeforeLeave();
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle); // 함수를 지우기 위해서 return 처리
  }, []); // 단 한 번만 실행
};

export default function App() {
  const begForLife = () => console.log("please dont go my mouse"); // 마우스 이탈시 할 작동 작성
  useBeforeLeave(begForLife);
  return (
      <div className="App">
        <h1>Hello</h1>
      </div>
  );
}