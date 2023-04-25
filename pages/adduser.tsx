import { useEffect, useState } from "react";

interface User {
  firstname: string;
  lastname: string;
  age: string;
  birthday: string
}

interface HomeProps {
  users: User[];
}

export default function Home(props: HomeProps) {
  const [userState, setUserState] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setUserState(props.users);
  }, [props.users]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
        const res = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          body: JSON.stringify({
            firstname: name,
            lastname: lastName,
            age: age,
            dateofbirth: birthday
          }),
        });
      
        const newUser = await res.json();
        setUserState([...userState, newUser]);
        console.log('Ronan is a genius');
        setName("");
        setLastName("");
        setAge("");
        setBirthday("");
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
  };

  return (
    <div className="container">
      <div>
        <div className="add-form">
          <form onSubmit={submitForm}>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              name="age"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              name="birthday"
              placeholder="Date of Birth"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Adding" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}