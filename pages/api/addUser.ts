import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, InsertOneResult } from 'mongodb';

interface User {
  firstname: string;
  lastname: string;
  age: number;
  birthday: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      return res.status(500).json({ error: 'MONGODB_URI environment variable is missing.' });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('my_database');
    const usersCollection = db.collection<User>('users');

    const { firstname, lastname, age, birthday } = req.body;

    const newUser: User = {
      firstname,
      lastname,
      age,
      birthday,
    };

    const result: InsertOneResult<User> = await usersCollection.insertOne(newUser);
    client.close();

    if (!result.acknowledged) {
      return res.status(500).json({ error: 'Failed to insert user.' });
    }

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
}
