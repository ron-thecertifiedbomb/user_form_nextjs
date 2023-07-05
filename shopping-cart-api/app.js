const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");

app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoURI =
  "mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/my_cart_database?retryWrites=true&w=majority";

app.use("/uploads", express.static("uploads"));

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  photo: { type: String },
});

const CartItem = mongoose.model("CartItem", cartItemSchema, "mycart");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the folder where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/api/mycart", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/mycart", upload.single("photo"), async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    if (
      typeof name !== "string" ||
      isNaN(parseFloat(price)) ||
      isNaN(parseInt(quantity))
    ) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const photo = req.file ? req.file.filename : "";
    const newItem = new CartItem({
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      photo,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Error creating cart item:", err); // Log the specific error
    res.status(500).json({ error: "Internal server error" }); // Return a 500 status code for internal server errors
  }
});

app.put("/api/mycart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updatedItem = await CartItem.findByIdAndUpdate(
      id,
      { name, price, quantity },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});

app.delete("/api/mycart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CartItem.findByIdAndRemove(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
