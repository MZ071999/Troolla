/* eslint-disable react/jsx-key */
import Navbar from "../components/Navbar";
import { MongoClient } from "mongodb";
import BasicTable from "../components/table/BasicTable";

function form({ cars }) {
  return (
    <div>
      <Navbar />
      <BasicTable props={cars} />
    </div>
  );
}

export default form;

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
