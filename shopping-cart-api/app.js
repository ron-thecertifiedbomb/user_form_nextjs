const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const cors = require('cors'); // Import the cors package

app.use(express.json());
app.use(cors()); // Use cors middleware


const mongoURI =
  'mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/my_cart_database?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the schema and model for the cart items
const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const CartItem = mongoose.model('CartItem', cartItemSchema, 'mycart'); // 'mycart' is the collection name

// Define API endpoints
app.get('/api/mycart', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/mycart', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const newItem = new CartItem({ name, price, quantity });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.put('/api/mycart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updatedItem = await CartItem.findByIdAndUpdate(
      id,
      { name, price, quantity },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.delete('/api/mycart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CartItem.findByIdAndRemove(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
