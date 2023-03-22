// 이미지 등을 풀스크린 한 후에 호출되는 hooks
const useFullScreen = (callback) => {
  const element = useRef();
  const triggerFull = () => {
    if (element.current) {
      if (callback || typeof callback === "function") callback(true);
      
      // 풀스크린으로 들어올 때는 그 객체를 통해 들어옴
      element.current.requestFullscreen();
      // firefox   => mozRequestFullscreen();
      // opera     => webkitRequestFullscreen();
      // Microsoft => msRequestFullscreen();
    }
  };
  const exitFull = () => {
    if (callback || typeof callback === "function") callback(false);
    
    // 풀스크린에서 나갈 때는 document 에서 나감
    document.exitFullscreen();
    // firefox   => mozExitFullscreen();
    // opera     => webkitExitFullscreen();
    // Microsoft => msExitFullscreen();
  };
  return { element, triggerFull, exitFull };
};

export default function App() {
  const onFulls = (isFull) => {
    console.log(isFull ? "already full" : "not full");
  };
  const { element, triggerFull, exitFull } = useFullScreen(onFulls);
  
  return (
      <div className="App" style={{ height: "1000vh" }}>
        <div ref={element}>
          <img src="https://i.ibb.co/R6RwNxx/grape.jpg" />
          <button onClick={triggerFull}>fullScreen</button>
          <button onClick={exitFull}>exitScreen</button>
        </div>
      </div>
  );
}
