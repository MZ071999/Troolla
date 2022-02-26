/* eslint-disable react/jsx-key */
import Navbar from "../components/Navbar";
import Sales from "../components/Sales";
import { MongoClient } from "mongodb";

function sales({ cars }) {
  return (
    <div>
      <Navbar />
      <Sales props={cars} />
    </div>
  );
}

export default sales;

export async function getServerSideProps(context) {
  const uri = process.env.MONGODB_URI;
  const { req } = context;
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const car = await db.collection("cars").find().toArray();
  const cars = JSON.parse(JSON.stringify(car));
  client.close();

  return {
    props: { cars },
  };
}
