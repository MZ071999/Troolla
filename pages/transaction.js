import { MongoClient } from "mongodb";
/* eslint-disable react/jsx-key */
import Navbar from "../components/Navbar";
import Table from "../components/transaction/table";
import Total from "../components/Total";

function transaction({ cars, price }) {
  const total_price = price[0].Price;
  console.log(cars);

  return (
    <div>
      <Navbar />
      <Table props={cars} />
      <Total total_price={total_price} />
    </div>
  );
}

export default transaction;

export async function getServerSideProps(context) {
  const uri = process.env.MONGODB_URI;
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const car = await db.collection("sales").find().toArray();
  const cars = JSON.parse(JSON.stringify(car));
  const total = await db
    .collection("sales")
    .aggregate([
      {
        $group: {
          _id: "",
          Price: { $sum: "$Price" },
        },
      },
      {
        $project: {
          _id: 0,
          Price: "$Price",
        },
      },
    ])
    .toArray();

  const price = JSON.parse(JSON.stringify(total));
  client.close();

  return {
    props: { cars, price },
  };
}
