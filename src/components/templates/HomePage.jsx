import { useEffect, useState } from "react";
import axios from "axios";
import TableCoin from "../modules/TableCoin";
import { getApiKey, getCointList } from "../../services/cryptoAPI";
import Pagination from "../modules/Pagination"
import Search from "../modules/Search";
function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [page, setPage] = useState(1);


  useEffect(() => {
    setisLoading(true);
    const options = {
      method: "GET",
      url: getCointList(),
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": getApiKey(),
      },
      params: {
        vs_currency: "usd",
        page: page,
        per_page:20
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
  }, [page]);
  return (
    <div>
      <Search/>
      <TableCoin coins={coins} isLoading={isLoading}/>
      <Pagination page={page} setPage={setPage} />

    </div>
  );
}

export default HomePage;
