import React, { useEffect, useReducer } from "react";
import AddToCartForm from "../components/AddToCart";
import { CartItem } from "../types/types";

interface CartState {
  cartItems: CartItem[];
  quantity: number[];
}

type CartAction =
  | { type: "FETCH_CART_ITEMS"; payload: CartItem[] }
  | { type: "DELETE_ITEM"; payload: string }
  | { type: "ADD_QUANTITY"; payload: { index: number; maxQuantity: number } }
  | { type: "SUBTRACT_QUANTITY"; payload: number }
  | { type: "ADD_TO_CART"; payload: CartItem };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "FETCH_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
        quantity: action.payload.map(() => 1),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
        quantity: state.quantity.filter(
          (_, index) =>
            index !==
            state.cartItems.findIndex((item) => item._id === action.payload)
        ),
      };
    case "ADD_QUANTITY":
      return {
        ...state,
        quantity: state.quantity.map((q, index) =>
          index === action.payload.index
            ? Math.min(q + 1, action.payload.maxQuantity)
            : q
        ),
      };
    case "SUBTRACT_QUANTITY":
      return {
        ...state,
        quantity: state.quantity.map((q, index) =>
          index === action.payload ? Math.max(q - 1, 1) : q
        ),
      };
    default:
      return state;
  }
};

const Cart: React.FC = () => {
  const initialState: CartState = {
    cartItems: [],
    quantity: [],
  };

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

  console.log(state.cartItems);

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
              Quantity: {state.quantity[index]}
              <button onClick={() => handleSubtractQuantity(index)}>-</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
