import React, { useState } from 'react';
import { CartItem } from '../types/types'; // Adjust the import path based on your project structure

const AddToCartForm: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemPhoto, setItemPhoto] = useState<File | null>(null); // File object for the selected photo

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceValue = parseFloat(itemPrice);
    const quantityValue = parseInt(itemQuantity);
  
    if (isNaN(priceValue) || isNaN(quantityValue)) {
      alert('Please enter valid numeric values for price and quantity.');
      return; // Prevent the form from being submitted
    }

    // Convert the selected photo to base64
    let photoBase64 = '';
    if (itemPhoto) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          photoBase64 = reader.result;
          const newItem: CartItem = {
            name: itemName,
            price: priceValue,
            quantity: quantityValue,
            _id: '',
            photo: photoBase64,
          };
          // Now you can include the photo data in the newItem object and proceed with your API call
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
              // ...
              // Clear the form inputs after adding the item to the cart
              setItemName('');
              setItemPrice('');
              setItemQuantity('');
              setItemPhoto(null);
            } else {
              // Handle the error response if needed
              console.error('Failed to add item to cart');
            }
          } catch (error) {
            // Handle any network or server errors
            console.error('Network/server error:', error);
          }
        }
      };
      reader.readAsDataURL(itemPhoto);
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
      <div>
        <label htmlFor="photo">Select Photo:</label>
        <input type="file" id="photo" onChange={(e) => setItemPhoto(e.target.files?.[0] || null)} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddToCartForm;
