const users = [
  {
    _id: "64a66e0c33b761828dc25ea5",
    username: "user_one",
    password: "Cn31100146",
    name: "Michiko Sibunga",
    birthdate: "September 13, 1979",
    gender: "male",
  },
  {
    _id: "64a671b533b761828dc25eb4",
    username: "user_two",
    password: "MyBabe0814",
    name: "Ronan Sibunga",
    birthdate: "March 28, 1980",
    gender: "female",
  },
  {
    _id: "64a671b533b761828dasdasA",
    username: "user_three",
    password: "Master_77",
    name: "Enrico Sibunga",
    birthdate: "May 13, 1977",
    gender: "male",
    photo: "photo-1688629685706-800090765-2.png",
  },
];

const stores = [
  {
    _id: "64a671b533b761828dc25eb4",
    storename: "Lizard Interactive",
    ownername: "Ronan Sibunga",
    address: "Ciudad Real",
    "mobile number": 9913817033,
  },

  {
    _id: "64a671b533b761828dc25ebz",
    storename: "Hello Kitty Store",
    ownername: "Michiko Sibunga",
    address: "Ciudad Real",
    "mobile number": 9219684331,
  },
  {
    _id: "64a671b533b761828dasdasA",
    storename: "Master Store",
    ownername: "Enrico Sibunga",
    address: "Swindon",
    "mobile number": 9380986,
  },
];

const itemUserName = "user_two";
const itemUserPassword = "MyBabe0814";

const userProfile = users.find(
  (user) => user.username === itemUserName && user.password === itemUserPassword
);

if (userProfile) {
  const storeProfile = stores.find((store) => store._id === userProfile._id);

  if (storeProfile) {
    console.log("Log in Successful");
    console.log(userProfile);
    console.log(storeProfile);
    console.log(storeProfile.storename, "!!!!!");
  } else {
    console.log("Store profile not found");
  }
} else {
  console.log("User not found");
}

console.log(userProfile.name);
console.log(userProfile.birthdate);
console.log(stores[0].storename);


const addUser = (user) => {
  const existingUser = users.find((existingUser) => existingUser.username === user.username);
  if (existingUser) {
    console.log("Username already taken");
  } else {
    users.push(user);
  }
};

const newUser = {
  _id: "64a671b533b761828dc25eb5",
  username: "user_four",
  password: "Password123",
  name: "John Doe",
  birthdate: "January 1, 1990",
  gender: "male",

};

addUser(newUser);

console.log(newUser);

