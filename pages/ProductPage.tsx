import React, { useReducer} from 'react';
import ProductCard from '../components/ProductCard';

import { cartReducer, initialState } from "../reducers/cartReducer";

const ProductPage: React.FC = () => {

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <ProductCard state={state} dispatch={dispatch} />
  );
};

export default ProductPage;
