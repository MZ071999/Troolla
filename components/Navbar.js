/* eslint-disable react/jsx-key */
import Link from "next/link";
import classes from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={classes.navbar}>
      <div className={classes.i}>
        <div className={classes.icons}>
          <Link href="/form" passHref>
            <div> Form </div>
          </Link>
          <Link href="/records" passHref>
            <div> Inventory </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
