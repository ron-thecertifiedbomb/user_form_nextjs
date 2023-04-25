import clientPromise from "../lib/mongodb";

interface User {
  _id: number;
  firstname: string;
  lastname: string;
  dateofbirth: string;
  age: number;
}

export default function Users({ users }: { users: User[] }) {
  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
        
          <h4>Name: {user.firstname} <span>{user.lastname}</span></h4>
          <h4>Date of Birth: {user.dateofbirth}</h4>
          <h4>Age: {user.age}</h4>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("my_database");

    const users = await db
      .collection("users")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    return {
      props: { users: JSON.parse(JSON.stringify(users)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { users: [] },
    };
  }
}
