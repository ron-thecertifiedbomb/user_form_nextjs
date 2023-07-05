import React, { useState } from 'react';
import { CartItem } from '../types/types'; // Adjust the import path based on your project structure



const AddToCartForm: React.FC = () => {

  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceValue = parseFloat(itemPrice);
    const quantityValue = parseInt(itemQuantity);
  
    if (isNaN(priceValue) || isNaN(quantityValue)) {
      alert('Please enter valid numeric values for price and quantity.');
      return; // Prevent the form from being submitted
    }
    const newItem: CartItem = {
      name: itemName,
      price: parseFloat(itemPrice),
      quantity: parseInt(itemQuantity),
      _id: ''
    };

    // POST the new item to the server
    try {
      const response = await fetch('http://localhost:3001/api/mycart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        // If the response is successful (status 200-299), add the item to the cart in the frontend
       newItem
        // Clear the form inputs after adding the item to the cart
        setItemName('');
        setItemPrice('');
        setItemQuantity('');
      } else {
        // Handle the error response if needed
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('Network/server error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          id="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Item Price:</label>
        <input
          type="text"
          id="price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          id="quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddToCartForm;
