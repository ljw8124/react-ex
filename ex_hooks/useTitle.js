const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

export default function App() {
  const titleUpdater = useTitle("Loading..");
  setTimeout(() => titleUpdater("Home"), 2000);
  
  return (
      <div className="App">
        <h1>Hello</h1>
      </div>
  );
}

// useEffect 를 활용하여 title 변경하는 방법