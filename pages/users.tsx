import { GetServerSideProps } from 'next';
import clientPromise from '../lib/mongodb';

interface User {
  _id: number;
  firstname: string;
  lastname: string;
  dateofbirth: string;
  age: number;
}

interface UsersPageProps {
  users: User[];
  errorMessage?: string;
}

export default function Users({ users, errorMessage }: UsersPageProps) {
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <h4>
            Name: {user.firstname} <span>{user.lastname}</span>
          </h4>
          <h4>Date of Birth: {user.dateofbirth}</h4>
          <h4>Age: {user.age}</h4>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('my_database');

    const users = await db
      .collection<User>('users')
      .find({})
      .sort({ _id: -1 })
      .limit(20)
      .toArray();

    return {
      props: { users },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        users: [],
        errorMessage: 'Error retrieving users.',
      },
    };
  }
};
