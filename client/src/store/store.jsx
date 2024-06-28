import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product.slice"; // Import the product reducer
import singleProductReducer from "./slices/singleProductslice";
import  cartSlice  from "./slices/CartSlice";
import registerReducer from './slices/registerSlice'
export const store = configureStore({
    reducer: {
        product: productReducer,
        singleProduct:singleProductReducer,
        register: registerReducer,
        cart:cartSlice // Use the product reducer
    }
});
store.subscribe(() => {
    const serializedData = JSON.stringify(store.getState().cart);
    sessionStorage.setItem('cart', serializedData);
  });