const express = require("express");
const mongoose = require("mongoose");

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
    app.listen(3001, () => {
      console.log("Server started on port 3001");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas:", error);
  });
  
  const newUserSchema = new mongoose.Schema(
    {
      username: String,
      password: String,
      firstname: String,
      lastname: String,
      dateofbirth: Date,
      address: String,
      contactno: String,
      email: String,
    },
    { collection: "users" }
  );
  

const newUser = mongoose.model("newUser", newUserSchema);

app.get("/api/users", async (req, res) => {
  try {
    const users = await newUser.find({});
    res.json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.post('/api/users/authenticate', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await newUser.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Authentication successful', userId: user._id, token });
  } catch (error) {
    console.error('Failed to authenticate user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
