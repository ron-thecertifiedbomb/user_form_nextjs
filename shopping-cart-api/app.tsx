import express, { Request, Response } from 'express';
import mongoose, { Schema, Document, Model } from 'mongoose';

const app = express();
app.use(express.json());

interface ICartItem extends Document {
  name: string;
  price: number;
  quantity: number;
}

const mongoURI = 'mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/?retryWrites=true&w=majority'; 
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the schema and model for the cart items
const cartItemSchema = new Schema<ICartItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const CartItem: Model<ICartItem> = mongoose.model('CartItem', cartItemSchema);

// Define API endpoints
app.get('/api/cart', async (req: Request, res: Response) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/cart', async (req: Request, res: Response) => {
  try {
    const { name, price, quantity } = req.body;
    const newItem = new CartItem({ name, price, quantity });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.put('/api/cart/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updatedItem = await CartItem.findByIdAndUpdate(id, { name, price, quantity }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.delete('/api/cart/:id', async (req: Request, res: Response) => {
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
