import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { Circles } from "react-loader-spinner";
import styles from "./TableCoin.module.css";
import { marketChart } from "../../services/cryptoAPI";

function TableCoin({ coins, isLoading, setChart }) {

  return (
    <div className={styles.container} id="market">
      {isLoading ? (
        <Circles height="80" width="80" color="#4fa94d" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24H</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow coin={coin} key={coin.id} setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({
  coin: {
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
    id,
  },
  setChart,
}) => {
  const showHandler = async (id) => {
    setChart(true);
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      console.log(json);
      setChart(json)
      
    } catch (e) {
      console.log(e);
      setChart(null)

    }
  };
  return (
    <tr key={id}>
      <td>
        <div className={styles.symbol} onClick={() => showHandler(id)}>
          <img src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>{current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>{<img src={price_change.toFixed(2) > 0 ? chartUp : chartDown} />}</td>
    </tr>
  );
};
