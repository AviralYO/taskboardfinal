import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test"); // Use your DB name
  const data = await db.collection("yourCollection").find({}).toArray();
  res.json(data);
}