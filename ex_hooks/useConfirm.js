// 어떤 동작이 일어나기 이 전에 확인 팝업을 이용하여 점검하는 방법
const useConfirm = (message = "", callback, rejection) => {
  if(typeof callback !== "function") return;
  
  const confirmAction = () => {
    if(confirm(message)) callback();
    else rejection();
  }
  return confirmAction;
}

export default function App() {
  const deleteWorld = () => console.log("Deleting the world....");
  const abort = () => console.log("abort...");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);
  
  return (
      <div className="App">
        <h1>Hello</h1>
        <button onClick={confirmDelete}>Delete the world</button>
      </div>
  );
}
