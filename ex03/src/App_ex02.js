import {useEffect, useState} from 'react';

function App_ex02() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  // useEffect 가 빈배열일 때 한번만 실행됨
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => {
          setCoins(json);
          setLoading(false);
        });
  }, []);
  return (
      <div>
        <h1>The Coins! ({coins.length})</h1>
        {loading ? <strong>Loading....</strong> : ""}
        <ul>
          {coins.map((coin) => (
              <li key={coin.id}>
                {coin.name} ({coin.symbol}: ${coin.quotes.USD.price})
              </li>
          ))}
        </ul>
      </div>
  )
}

export default App_ex02;