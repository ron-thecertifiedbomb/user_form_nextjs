import React, { useReducer } from "react";
// import AddProductForm from "../components/AddProductForm";
import { cartReducer, initialState } from "../reducers/cartReducer";
import LoginForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";


const App: React.FC = () => {
  // const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div >
<SignUpForm />
      {/* <LoginForm /> */}
      {/* <AddProductForm dispatch={dispatch} /> */}
    </div>
  );
};

export default App;
