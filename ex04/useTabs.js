// react 에서 useState 를 이용하여 useTaps hooks 만들기

const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2"
  }
];

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  
  if (!allTabs || !Array.isArray(allTabs)) return;
  
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  };
};

export default function App() {
  const { currentItem, changeItem } = useTabs(1, content);
  return (
      <div className="App">
        <h1>Hello</h1>
        {content.map((section, index) => (
            <button onClick={() => changeItem(index)}>
              {section.tab}
            </button>
        ))}
        {currentItem.content}
      </div>
  );
}
