import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const client = await MongoClient.connect(uri);

  if (req.method === "POST") {
    const { carItem } = req.body;

    const db = client.db();
    const car = await db.collection("cars").findOne({ _id: ObjectId(carItem) });
    await db.collection("cars").deleteOne({
      _id: ObjectId(carItem),
    });
    await db.collection("sales").insertOne({
      _id: ObjectId(carItem),
      carName: car.carName,
      carModel: car.carModel,
      carSKU: car.carSKU,
      Price: car.carPrice,
    });
    client.close();
    res.status(200).send({ message: "Deleted!" });
  }
}
