// network 가 online 인지 offline 인지 감지하여 처리할 수 있는 hooks
const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine);
  
  const handleChange = () => {
    if (typeof onChange === 'function') {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  
  useEffect(
      () => {
        window.addEventListener('online', handleChange);
        window.addEventListener('offline', handleChange);
        () => {
          window.removeEventListener('online', handleChange);
          window.removeEventListener('offline', handleChange);
        };
      }, []);
  return status;
};

export default function App() {
  const handleNetworkChange = (online) => {
    console.log(online ? 'We just went Online' : 'We are now Offline');
  };
  const onLine = useNetwork(handleNetworkChange);
  return (
      <div className="App">
        <h1>{onLine ? 'Online' : 'Offline'}</h1>
      </div>
  );
}
