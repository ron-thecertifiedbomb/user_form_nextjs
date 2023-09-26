import React, { useState, ChangeEvent, FormEvent } from "react";

interface UserProfile {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  dateofbirth: string;
  address: string;
  contactno: string;
  email: string;
}

const SignUpForm = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    dateofbirth: "",
    address: "",
    contactno: "",
    email: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      username,
      password,
      firstname,
      lastname,
      dateofbirth,
      address,
      contactno,
      email,
    } = userProfile;

    if (
      !username ||
      !password ||
      !firstname ||
      !lastname ||
      !dateofbirth ||
      !address ||
      !contactno ||
      !email
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Your form submission code here...
      alert("Sign-up successful");
      setUserProfile({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        address: "",
        contactno: "",
        email: "",
      });
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
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userProfile.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userProfile.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={userProfile.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={userProfile.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="dateofbirth">Date of Birth:</label>
          <input
            type="date"
            id="dateofbirth"
            name="dateofbirth"
            value={userProfile.dateofbirth}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userProfile.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="contactno">Contact No:</label>
          <input
            type="text"
            id="contactno"
            name="contactno"
            value={userProfile.contactno}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userProfile.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
