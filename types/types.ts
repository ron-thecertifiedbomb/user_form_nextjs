
export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  _id: string;
  photo: string;
}

export interface CartState {
  cartItems: CartItem[];
  quantity: number[];
}

export type CartAction =
  | { type: "FETCH_CART_ITEMS"; payload: CartItem[] }
  | { type: "DELETE_ITEM"; payload: string }
  | { type: "ADD_QUANTITY"; payload: { index: number; maxQuantity: number } }
  | { type: "SUBTRACT_QUANTITY"; payload: number }
  | { type: "ADD_TO_CART"; payload: CartItem };

export interface UserProfile {
  username: string;
  firstname: string;
  lastname: string;
  dateofbirth: string;
  address: string;
  contactno: string;
  email: string;
}
