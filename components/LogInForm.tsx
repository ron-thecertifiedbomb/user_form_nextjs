import React, { useState, ChangeEvent, FormEvent } from "react";

interface LoginFormProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setProfileId: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoggedIn, setProfileId }) => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");


  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === "" || password === "") {
      setError("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/users/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const userId = data.userId;
        alert("Authentication successful");
        console.log(data);
        console.log("User ID:", userId);
        setIsLoggedIn(true)
        setProfileId(userId)
        console.log(userId)
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      alert("Authentication failed");
      setError("Authentication failed. Please check your credentials.");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <label htmlFor="username" style={{ marginRight: "20px" }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            style={{ padding: "5px", width: "200px" }}
          />
        </div>
        <br></br>
        <div>
          <label style={{ marginRight: "20px" }} htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ padding: "5px", width: "200px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
