// types.ts
export interface CartItem {
    [x: string]: string | number | boolean | {} | ReactElement<any, string | JSXElementConstructor<any>> | ReactNodeArray | ReactPortal | null | undefined;
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

