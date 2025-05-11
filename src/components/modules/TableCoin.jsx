import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { Circles } from "react-loader-spinner";
import styles from "./TableCoin.module.css";

function TableCoin({ coins, isLoading }) {
  console.log(coins);

  return (
    <div className={styles.container}>
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
              <TableRow coin={coin} key={coin.id} />
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
}) => {
  return (
    <tr key={id}>
      <td>
        <div className={styles.symbol}>
          <img src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>{current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? styles.success : styles.error}>{price_change.toFixed(2)}%</td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        {
          <img
            src={price_change.toFixed(2) > 0 ? chartUp : chartDown}
          />
        }
      </td>
    </tr>
  );
};
