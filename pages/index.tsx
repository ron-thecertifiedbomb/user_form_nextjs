import React, { useReducer } from "react";
import AddProductForm from "../components/AddProductForm";
import { cartReducer, initialState } from "../reducers/cartReducer";


const App: React.FC = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div>
      <h2>Add Products</h2>
      <AddProductForm dispatch={dispatch} />
    </div>
  );
};

export default App;
