import {useState} from 'react';

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if(toDo === "") {
      return;
    }
    // toDO = ""  이런 식으로 state 를 직접적으로 수정하면 절대 안됨!!!
    setToDo("");
    // array state 를 수정하는 방법 & 스프레드 연산자 활용법
    setToDos(prevArray => [toDo, ...prevArray]);
  };
  console.log(toDos);


  // jsx 에서 자바스크립트를 삽입하는 방법은 중괄호를 사용한다.
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
            type="text"
            value={toDo}
            placeholder="Write your toDo List"
            onChange={onChange}
        />
        <button>Add To Do</button>
      </form>
    </div>
  );
}

export default App;
