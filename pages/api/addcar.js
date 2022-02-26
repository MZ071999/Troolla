import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const client = await MongoClient.connect(uri);

  if (req.method === "POST") {
    const { carName, carModel, carSKU, carPrice } = req.body;

    const db = client.db();
    await db.collection("cars").insertOne({
      carName: carName,
      carModel: carModel,
      carSKU: carSKU,
      carPrice: carPrice,
    });
    client.close();
    res.status(200).send({ message: "Added!" });
  }
}
