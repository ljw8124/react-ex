// page 를 종료하기 전에 팝업으로 페이지 떠나는게 맞는지 물어보는 함수
export const usePreventLeave = () => {
  const listener = (event) => {
    // e.stopPropagation() -> 상위 엘리먼트에 이벤트가 전달되는 것을 방지
    // e.preventDefault() -> 그 태그의 고유 속성을 중단시키는 기능
    event.preventDefault();
    // event.returnValue = ""; // 이 값이 없으면 제대로 작동을 하지 않음
    event.defaultPrevented();
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
      window.removeEventListener("beforeunload", listener);
  
  return { enablePrevent, disablePrevent };
};

export default function App() {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
      <div className="App">
        <h1>Hello</h1>
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>UnProtect</button>
      </div>
  );
}
