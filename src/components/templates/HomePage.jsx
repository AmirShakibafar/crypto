import { useEffect, useState } from "react";
import axios from "axios";
import TableCoin from "../modules/TableCoin";
import { getApiKey, getCointList } from "../../services/cryptoAPI";
import Pagination from "../modules/Pagination"
function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setisLoading] = useState(true);

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
        setCoins(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <Pagination/>
      <TableCoin coins={coins} isLoading={isLoading} />
    </div>
  );
}

export default HomePage;
