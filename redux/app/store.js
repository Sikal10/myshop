import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "../../redux/slices/productSlices/productSlice";
import cartReducer from "../../redux/slices/cartSlices/cartSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    }
});