/* eslint-disable react/jsx-key */
import { useRef, useState } from "react";
import classes from "./Sales.module.css";
import axios from "axios";
import router from "next/router";

function Sales({ props }) {
  const enteredName = useRef();
  const [added, setAdded] = useState(false);

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    const carData = {
      carItem: enteredName.current.value,
    };

    axios.post("/api/addsales", carData).then((data) => {
      setAdded(true);
      router.reload("/transaction");
    });
  };

  return (
    <div>
      <form className={classes.wrapper} onSubmit={formSubmissionHandler}>
        <label> Car Item </label>
        <select ref={enteredName}>
          {props.map((prop) => (
            <option key={prop._id} value={prop._id}>
              {prop.carName}, {prop.carSKU}
            </option>
          ))}
        </select>
        <button className={classes.btn}> This Car is Sold </button>
      </form>
      {added && (
        <div className={classes.green}> A new sale is added successfully! </div>
      )}
    </div>
  );
}

export default Sales;
