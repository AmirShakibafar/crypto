import styles from "./Pagination.module.css"
function Pagination({page, setPage}) {
  console.log(page)
  const prevHandler = () => {
    if (page == 1) return;
    setPage((page) => page - 1);
  }
  const nextHandler = () => {
    if (page==10) return;
    setPage((page) => page + 1);
  }
  return (
    <div className={styles.pagination}>
      <button onClick={prevHandler} className={(page === 1) ? styles.disabled:null}>prev</button>
      <p className={page === 1? styles.selected:null}>1</p>
      <p className={page === 2? styles.selected:null}>2</p>
      <span>...</span>
      {page > 2 && page < 9 && (
        <>
        <p className={styles.selected}>{page}</p>
        <span>...</span>

        </>
      )}
      <p className={page === 9? styles.selected:null}>9</p>
      <p className={page === 10? styles.selected:null}>10</p>
      <button onClick={nextHandler} className={page === 10 ? styles.disabled:null}>next</button>
    </div>
  );
}

export default Pagination;
