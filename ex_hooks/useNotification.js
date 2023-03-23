// Notification API 활용
const useNotification = (title, options) => {
  // 모바일에서 진동기능 -> Notification.vibrate();
  if (!"Notification" in window) return;
  
  const fireNotif = () => {
    // 이 때 알람 허용을 거부하면 다시는 안물어보기 때문에
    // 다시 설정할 때 까지 알람이 나오지 않게 된다.
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};

export default function App() {
  const triggerNotif = useNotification("alarm message!!", {
    body: "this is message for alarm test!!"
    // 이 외에도 이미지, 아이콘 등 다양한 것을 전달 할 수 있다.
  });
  
  return (
      <div className="App">
        <h1>Hello!</h1>
        <button onClick={triggerNotif}>alarm</button>
      </div>
  );
}
