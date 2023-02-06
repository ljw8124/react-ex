import Button from './Button';
import styles from './App.module.css';
import {useState, useEffect} from 'react';

function App() {
  // 현재 코드는 state 가 변경될 때마다 모두 render 되고 있다.
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState('default');
  const onClick = () => setValue(prev => prev + 1);
  const onChange = (e) => {setKeyword(e.target.value)};
  // useEffect 는 코드가 딱 한번만 실행될 수 있도록 보호해준다.
  useEffect(() => {
    console.log('I run only once');
  }, []); // 변화 대상을 정하지 않았으므로 시작한 후, 한 번만 호출하겠다는 의미

  // 두번째 파라미터는 변화를 바라볼 대상이다.
  // 즉 이 코드에서는 keyword 가 변화해야 아래 useEffect 가 호출된다.
  useEffect(() => {
    if(keyword !== "" && keyword.length > 6){
      console.log("Search For", keyword);
    }
  }, [keyword]);  // keyword 가 변화할 때 마다 호출하겠다는 의미

  useEffect(() => {
    console.log("I run 'counter' changes");
  }, [counter]);
  return (
    <div>
      <input
          value={keyword}
          type="text"
          placeholder="Search here..."
          onChange={onChange}
      />
      <h1 className={styles.title} onClick={onClick}>Welcome back! {counter}</h1>
      <Button text={"continue"}/>
    </div>
  );
}

export default App;

// cmd 로 리액트 서버 실행방법
// npx -> npm start
