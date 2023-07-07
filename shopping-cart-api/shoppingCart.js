const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use("/uploads", express.static("uploads"));

const mongoURI =
  "mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/my_cart_database?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas:", error);
  });


const cartItemSchema = new mongoose.Schema(
  {
    name: String,
    username: Number,
    stock: Number,
    quantity: Number,
    photo: String,
  },
  { collection: "shopping_cart" }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

app.get("/api/shopping_cart", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to add a cart item
app.post("/api/shopping_cart", async (req, res) => {
  const { name, price, stock, quantity, photo } = req.body;

  try {
    const cartItem = new CartItem({ name, price, stock, quantity, photo });
    const savedCartItem = await cartItem.save();

    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error("Failed to save cart item:", error);
    res.status(500).json({ error: "Failed to save cart item" });
  }
});

app.delete("/api/shopping_cart/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const deletedCartItem = await CartItem.findByIdAndDelete(itemId);
    if (!deletedCartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Failed to delete cart item:", error);
    res.status(500).json({ error: "Failed to delete cart item" });
  }
});
