const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoURI =
  "mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/my_cart_database?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(2000, () => {
      console.log("Server started on port 2000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas:", error);
  });

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    dateofbirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactno: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "users" }
);

const UserProfile = mongoose.model("User", userSchema);

app.get("/api/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userProfile = await UserProfile.findOne({ _id: id });

    if (userProfile) {
      res.json(userProfile);
    } else {
      res.status(404).json({ message: "User profile not found" });
    }
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/users", async (req, res) => {
  const { username, password, firstname, lastname, dateofbirth, address, contactno, email } = req.body;

  try {
    const existingUser = await UserProfile.findOne({ username });
    const existingEmail = await UserProfile.findOne({ email });

    if (existingUser) {
      console.error("Username already exists:", username);
      return res.status(409).json({ error: "Username already exists" });
    }

    if (existingEmail) {
      console.error("Email already exists:", email);
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserProfile({
      username,
      password: hashedPassword,
      firstname,
      lastname,
      dateofbirth,
      address,
      contactno,
      email,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});
