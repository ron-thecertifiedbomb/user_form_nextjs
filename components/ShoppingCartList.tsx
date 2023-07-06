import React, { useEffect, useState } from 'react';
import { CartItem } from "../types/types";

const ShoppingCartList = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shopping_cart');
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

    fetchCartItems();
  }, []);

  const handleDeleteItem = async (itemId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/shopping_cart/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
        setCartItems(updatedCartItems);
      } else {
        console.error('Failed to delete item from cart');
      }
    } catch (error) {
      console.error('Network/server error:', error);
    }
  };

  return (
    <div>
      <h2>Shopping Cart List</h2>
      {cartItems.map((item) => (
        <div key={item._id}>
          <p>Name: {item.name}</p>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Item Total Price: ${item.price * item.quantity}</p>
          <div style={{ width: '200px'}}>{item.photo && <img src={`http://localhost:5000/uploads/${item.photo}`} alt={item.name}  style={{ width: '100%'}}/>}</div>
          <button onClick={() => handleDeleteItem(item._id)}>Delete</button> {/* Button to delete the item */}
        </div>
      ))}

      <p>Total Price: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p> {/* Display the total price */}
    </div>
  );
};

export default ShoppingCartList;
