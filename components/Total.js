import classes from "./Total.module.css";

function Total({ total_price }) {
  return (
    <div className={classes.card}>
      <div className={classes.total}>Total Sales:</div>
      <div> {total_price} </div>
    </div>
  );
}

export default Total;
