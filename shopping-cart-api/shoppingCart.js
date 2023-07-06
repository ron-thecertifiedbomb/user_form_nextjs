

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


const mongoURI = "mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/my_cart_database?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(3004, () => {
      console.log('Server started on port 3004');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas:', error);
  });

// Define the cart item schema
const cartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  photo: String,
}, { collection: 'shopping_cart' });


const CartItem = mongoose.model('CartItem', cartItemSchema);

// API endpoint to add a cart item
app.post('/api/shopping_cart', async (req, res) => {
  const { name, price, quantity, photo } = req.body;

  try {
    const cartItem = new CartItem({ name, price, quantity, photo });
    const savedCartItem = await cartItem.save();

    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error('Failed to save cart item:', error);
    res.status(500).json({ error: 'Failed to save cart item' });
  }
});
