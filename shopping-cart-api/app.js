const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer'); // Import the multer package

app.use(express.json());

const cors = require('cors');
app.use(express.json());
app.use(cors());

const mongoURI =
  'mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/my_cart_database?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  photo: { type: String }, // Add a new field to store the photo filename or URL
});

const CartItem = mongoose.model('CartItem', cartItemSchema, 'mycart');

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the folder where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define API endpoints
app.get('/api/mycart', async (req, res) => {
  // Your existing code for GET request
});

// Use the upload middleware for the POST request to handle file upload
app.post('/api/mycart', upload.single('photo'), async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const photo = req.file.filename; // Get the filename of the uploaded photo
    const newItem = new CartItem({ name, price, quantity, photo });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.put('/api/mycart/:id', async (req, res) => {
  // Your existing code for PUT request
});

app.delete('/api/mycart/:id', async (req, res) => {
  // Your existing code for DELETE request
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
