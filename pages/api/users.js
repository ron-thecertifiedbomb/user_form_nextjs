import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("my_database");
    switch (req.method) {
      case "POST":
        let bodyObject = JSON.parse(req.body);
        let addUser = await db.collection("users").insertOne(bodyObject);
        res.json(addUser.ops[0]);
        break;
      case "GET":
        const users = await db.collection("users").find({}).toArray();
        res.json(users);
        break;
    }
}
