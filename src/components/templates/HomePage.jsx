import { useEffect, useState } from "react";
import axios from "axios";
import TableCoin from "../modules/TableCoin";
import { getApiKey, getCointList } from "../../services/cryptoAPI";

function HomePage() {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      url: getCointList(),
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": getApiKey(),
      },
      params: {
        vs_currency: "usd",
      },
    };

    axios
      .request(options)
      .then((response) => {
        setCoins(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return <TableCoin coins={coins}/>;
}

export default HomePage;
