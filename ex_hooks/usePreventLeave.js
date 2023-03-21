// page 를 종료하기 전에 팝업으로 페이지 떠나는게 맞는지 물어보는 함수
export const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
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
