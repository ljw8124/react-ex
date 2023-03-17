//
// export default function App() {
//   const inputRef = useRef();
//   setTimeout(() => inputRef.current.focus(), 2000);
//   return (
//       <div className="App">
//         <h1>Hello</h1>
//         <input ref={inputRef} placeholder="sample" />
//       </div>
//   );
// }
// React 의 useRef 를 이용하여 getElementById 와 같은 효과를 내기

const useClick = (onClick) => {
  // 유효성 점검
  if(typeof onClick !== "function") return;
  
  const element = useRef(); // reference 가 존재 하기 때문에 useClick 또한 작동
  useEffect(() => {
    // mount 되었을 때 -> componentDidMount, componentDidUpdate
    if(element.current) {
      element.current.addEventListener("click", onClick);
    }
    // unMount 되었을 때
    return () => {
      if(element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
}

export default function App() {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);
  return (
      <div className="App">
        <h1 ref={title}>Hello</h1>
      </div>
  );
}

// useHover 도 같은 원리로 이벤트를 추가할 수 있다.