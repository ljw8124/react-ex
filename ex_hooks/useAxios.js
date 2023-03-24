import defaultAxios from "axios";
import { useEffect, useState } from "react";

// axiosInstance 가 없다면 defaultAxios 를 이용하여 헤더 설정
const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });
  
  // 새로고침 위해서 넣음
  const [trigger, setTrigger] = useState(0);
  
  if (!opts.url) return;
  
  const refetch = () => {
    setState({
      ...state,
      loading: true
    });
    setTrigger(Date.now());
  };
  useEffect(() => {
    axiosInstance(opts)
        .then((data) => {
          setState({
            ...state,
            loading: false,
            data
          });
        })
        .catch((error) => {
          setState({ ...state, loading: false, error });
          console.error(error);
        });
  }, [trigger]);
  return { ...state };
};

export default useAxios;

// App.js 코드
/*
export default function App() {
  const { loading, data, error, refetch } = useAxios({
    url: "https://yts.mx/api/v2/list_movies.json"
  });
  console.log(JSON.stringify(data));
  return (
    <div className="App">
      <h1>Hello!</h1>
      <h1>{data && data.status}</h1>
      <h2>{loading && "Loading"}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}

 */