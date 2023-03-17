
export default function App() {
  const sayHello = () => console.log('hello!');
  
  const [number, setNumber] = useState(0);
  const [aNumber, setANumber] = useState(0);
  
  useEffect(sayHello, []);
  
  return (
      <div className="App">
        <h1>Hello</h1>
        <button onClick={() => setNumber(number+1)}>{number}</button>
        <button onClick={() => setANumber(aNumber+1)}>{aNumber}</button>
      </div>
  );
}

// useEffect 는 두번 째 파라미터에 넣는 값이 변경함에 따라 호출된다. 빈 배열로 넣을 경우, 최초의 한 번만 실행됨.