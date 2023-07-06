import React, { useEffect, useReducer } from "react";
import AddToCartForm from "../components/AddToCart";
import { CartItem } from "../types/types";
import { cartReducer, initialState } from "../reducers/cartReducer";

const Cart: React.FC = () => {

  const [state, dispatch] = useReducer(cartReducer, initialState);


  useEffect(() => {

    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/mycart");
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "FETCH_CART_ITEMS", payload: data });
        } else {
          console.error("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Network/server error:", error);
      }
    };

    fetchCartItems();
  }, []);


  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/mycart/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch({ type: "DELETE_ITEM", payload: id });
      } else {
        console.error("Failed to delete item from cart");
      }
    } catch (error) {
      console.error("Network/server error:", error);
    }
  };

  const handleAddQuantity = (index: number, maxQuantity: number) => {
    dispatch({ type: "ADD_QUANTITY", payload: { index, maxQuantity } });
  };

  const handleSubtractQuantity = (index: number) => {
    dispatch({ type: "SUBTRACT_QUANTITY", payload: index });
  };

  const handleAddToCart = async (item: CartItem) => {
    try {
      const response = await fetch("http://localhost:3004/api/shopping_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {

        alert("Item added to cart");
      } else {
 
        console.error("Failed to add item to cart");
      }
    } catch (error) {
   
      console.error("Network/server error:", error);
    }
  };
  
  console.log(state.cartItems)

  return (
    <div>
      <h2>Add Products</h2>
      <AddToCartForm dispatch={dispatch} />

      <ul>
        {state.cartItems.map((item, index) => (
          <li key={item._id}>
            <div>
              {item.photo && (
                <img
                  src={`http://localhost:3001/uploads/${item.photo}`}
                  alt={item.name}
                  style={{ width: "100px" }}
                />
              )}
            </div>
            <div>
              <span>{item.name}</span>
              <span> - ${item.price}</span>
              <span> - Quantity: {item.quantity}</span>
              <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
              <button onClick={() => handleAddQuantity(index, item.quantity)}>
                +
              </button>
              Quantity: {state.quantities[index]}
              <button onClick={() => handleSubtractQuantity(index)}>-</button>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
