import React, { useState, ChangeEvent, FormEvent } from "react";

interface UserProfile {
  username: string;
  firstname: string;
  lastname: string;
  dateofbirth: string;
  address: string;
  contactno: string;
  email: string;
}

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateofbirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [contactno, setContactNo] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const handleDateOfBirthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(event.target.value);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleContactNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContactNo(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password || !firstname || !lastname || !dateofbirth || !address || !contactno || !email) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:2000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          firstname,
          lastname,
          dateofbirth,
          address,
          contactno,
          email,
        }),
      });

      if (response.ok) {
        const savedUser = await response.json();
        alert("Sign-up successful");
        setUsername("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setDateOfBirth("");
        setAddress("");
        setContactNo("");
        setEmail("");
      } 
      else {
        const errorData = await response.json();
        if (errorData.error === "Username already exists") {
          alert("Username already exists");
        } else if (errorData.error === "Email already exists") {
          alert("Email already exists");
        } else {
          console.error("Failed to sign up:", response.status);
          alert("Failed to sign up");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to sign up");
    }
  };
  
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstname} onChange={handleFirstnameChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastname} onChange={handleLastnameChange} />
        </div>
        <div>
  <label>Date of Birth:</label>
  <input type="date" value={dateofbirth} onChange={handleDateOfBirthChange} />
</div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={handleAddressChange} />
        </div>
        <div>
          <label>Contact No:</label>
          <input type="text" value={contactno} onChange={handleContactNoChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={handleEmailChange} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
