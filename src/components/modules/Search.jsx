import { useState, useEffect } from "react";
import axios from "axios";
import { searchCoin, getApiKey } from "../../services/cryptoAPI";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const controller = new AbortController(); // Use AbortController to cancel the request

    const search = async () => {
      try {
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
          signal: controller.signal, // Attach signal for cancellation
        };

        const response = await axios.request(options);
        if (response.data.coins) {
            setCoins(response.data.coins)
        } else {
            alert(response.status.error_message)
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
    }

  
    return () => {
      controller.abort();
    };
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
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
    </div>
  );
}

export default Search;
