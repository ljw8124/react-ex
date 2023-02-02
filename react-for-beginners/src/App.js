import Button from './Button';
import styles from './App.module.css';
import {useState, useEffect} from 'react';

function App() {
  // 현재 코드는 state 가 변경될 때마다 모두 render 되고 있다.
  const [counter, setValue] = useState(0);
  const onClick = () => setValue(prev => prev + 1);
  console.log('render');
  // useEffect 는 코드가 딱 한번만 실행될 수 있도록 보호해준다.
  useEffect(() => {
    console.log('I run only once');
  }, []);
  return (
    <div>
      <h1 className={styles.title} onClick={onClick}>Welcome back! {counter}</h1>
      <Button text={"continue"}/>
    </div>
  );
}

export default App;
