import React, { useState, useEffect } from 'react';
import AddToCartForm from '../components/AddToCart';
import { CartItem } from '../types/types'; // Adjust the import path based on your project structure

const Cart: React.FC = () => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/mycart'); // Replace with your server API endpoint
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Network/server error:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartItems]);

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/mycart/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCartItems(cartItems.filter((item) => item._id !== id));
      } else {
        console.error('Failed to delete item from cart');
      }
    } catch (error) {
      console.error('Network/server error:', error);
    }
  };

  return (
    <div>
      <h2>Add Products</h2>
      <AddToCartForm />

      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price} - Quantity: {item.quantity}
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
