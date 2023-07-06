
import { CartState, CartAction} from "../types/types";

export const initialState: CartState = {
  cartItems: [],
  quantities: [], // Rename the quantity state to quantities
};


export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "FETCH_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
        quantities: action.payload.map(() => 1),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload),
        quantities: state.quantities.filter(
          (_, index) => index !== state.cartItems.findIndex((item) => item._id === action.payload)
        ),
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.item],
        quantities: [...state.quantities, action.payload.quantity],
      };
    default:
      return state;
  }
};