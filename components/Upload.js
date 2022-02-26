/* eslint-disable react/jsx-key */
import classes from "./Upload.module.css";
import axios from "axios";
import { useState, useRef } from "react";
import router from "next/router";

function Upload() {
  const enteredName = useRef();
  const enteredModel = useRef();
  const enteredSKU = useRef();
  const enteredPrice = useRef();
  const [added, setAdded] = useState(false);

  const carChange = (event) => {
    setAdded(false);
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    const carData = {
      carName: enteredName.current.value,
      carModel: enteredModel.current.value,
      carSKU: enteredSKU.current.value,
      carPrice: parseInt(enteredPrice.current.value),
    };

    axios.post("/api/addcar", carData).then((data) => {
      setAdded(true);
      router.reload("/form");
    });
  };

  return (
    <div>
      <form className={classes.wrapper} onSubmit={formSubmissionHandler}>
        <label> Car Name </label>
        <input
          type="text"
          id="name"
          name="name"
          ref={enteredName}
          onChange={carChange}
        />
        <label> Car Model </label>
        <input type="text" id="model" name="model" ref={enteredModel} />
        <label> Car SKU </label>
        <input type="text" id="sku" name="sku" ref={enteredSKU} />
        <label> Car Price </label>
        <input type="number" id="price" name="price" ref={enteredPrice} />
        <button className={classes.btn}> Add New Car </button>
      </form>
      {added && (
        <div className={classes.green}> A car is added successfully! </div>
      )}
    </div>
  );
}

export default Upload;
