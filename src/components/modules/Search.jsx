import { useState, useEffect } from "react";
import axios from "axios";
import { searchCoin, getApiKey } from "../../services/cryptoAPI";
import { Circles } from "react-loader-spinner";
import styles from "./Search.module.css";
function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); // Use AbortController to cancel the request

    const search = async () => {
      try {
        setIsLoading(true);
        const options = {
          method: "GET",
          url: searchCoin(),
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": getApiKey(),
          },
          params: {
            query: text,
          },
          signal: controller.signal,
        };

        const response = await axios.request(options);
        if (response.data.coins) {
          setIsLoading(false);
          setCoins(response.data.coins);
        } else {
          alert(response.status.error_message);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
        } else {
          console.error("API request failed:", error);
        }
      }
    };

    if (text) {
      search();
    } else {
      setIsLoading(false);
      setCoins([]);
    }

    return () => {
      controller.abort();
    };
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search for a coin (results in console)..."
        value={text}
        onChange={handleChange}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading && <Circles height="30" width="30" color="#4fa94d" />}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div> 
      )}
    </div>
  );
}

export default Search;
