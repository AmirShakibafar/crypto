import { useEffect, useState } from "react";
import axios from "axios";
import TableCoin from "../modules/TableCoin";
import { getApiKey, getCointList } from "../../services/cryptoAPI";
import Pagination from "../modules/Pagination"
import Search from "../modules/Search";
import Chart from "../modules/Chart";
// Removed import styles from "./HomePage.module.css"; - Styles are now in Layout


function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);


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
        vs_currency: currency,
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
  }, [page, currency]);
  return (
    // Removed outer div, header and footer. Layout component will provide these.
    <>
      <Search currency={currency} setCurrency={setCurrency}/>
      <TableCoin coins={coins} isLoading={isLoading} setChart={setChart}/>
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart}/>}
    </>
  );
}

export default HomePage;
