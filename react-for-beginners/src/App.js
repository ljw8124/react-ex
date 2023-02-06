//import Button from './Button';
//import styles from './App.module.css';
import {useState, useEffect} from 'react';

function Hello() {
  function destroyFn() {
    console.log('destroyed!');
  }
  function createFn() {
    console.log('created!');
    // return 을 하여서 컴포넌트가 지워지는 등의 행위가 생길 때 호출해줄 수 있음
    return destroyFn;
  }
  useEffect(createFn, []);
  return <h1>Hello!</h1>
}

function App() {
  // // 현재 코드는 state 가 변경될 때마다 모두 render 되고 있다.
  // const [counter, setValue] = useState(0);
  // const [keyword, setKeyword] = useState('default');
  // const onClick = () => setValue(prev => prev + 1);
  // const onChange = (e) => {setKeyword(e.target.value)};
  // // useEffect 는 코드가 딱 한번만 실행될 수 있도록 보호해준다.
  // useEffect(() => {
  //   console.log('I run only once');
  // }, []); // 변화 대상을 정하지 않았으므로 시작한 후, 한 번만 호출하겠다는 의미
  //
  // // 두번째 파라미터는 변화를 바라볼 대상이다.
  // // 즉 이 코드에서는 keyword 가 변화해야 아래 useEffect 가 호출된다.
  // useEffect(() => {
  //   if(keyword !== "" && keyword.length > 6){
  //     console.log("Search For", keyword);
  //   }
  // }, [keyword]);  // keyword 가 변화할 때 마다 호출하겠다는 의미
  //
  // useEffect(() => {
  //   console.log("I run 'counter' changes");
  // }, [counter]);
  // return (
  //   <div>
  //     <input
  //         value={keyword}
  //         type="text"
  //         placeholder="Search here..."
  //         onChange={onChange}
  //     />
  //     <h1 className={styles.title} onClick={onClick}>Welcome back! {counter}</h1>
  //     <Button text={"continue"}/>
  //   </div>
  // );
  
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing(prev => !prev);
  return (
      <div>
        {showing ? <Hello /> : null}
        <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
      </div>
  )
  
}

export default App;

// cmd 로 리액트 서버 실행방법
// npx -> npm start
