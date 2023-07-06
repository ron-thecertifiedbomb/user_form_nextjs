
import { CartState, CartAction } from "../types/types";


export const initialState: CartState = {
    cartItems: [],
    quantity: [],
  };


  export const cartReducer = (state: CartState, action: CartAction): CartState => {
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