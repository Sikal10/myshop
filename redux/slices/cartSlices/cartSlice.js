import {createSlice} from "@reduxjs/toolkit";
import {addToCart, removeFromCart} from "./cartAPI";

//getting the item from localStorage
const cartItemsFromStorage = typeof window !== "undefined" && localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const initialState = {
    loading: "idle",
    cartItems: cartItemsFromStorage
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: {
        [addToCart.pending]: (state) => {
            state.loading = "loading"
        },
        [addToCart.fulfilled]: (state, action) => {
            state.loading = "loaded"
            const item = action.payload;

            //check if the item already exists in the cart.
            const existItem = state.cartItems.find(cartItem => cartItem.productId === item.productId);

            if (existItem) {
                state.cartItems = state.cartItems.map(cartItem => cartItem.productId === existItem.productId ? item : cartItem);
            } else {
                state.cartItems.push(item);
            }

            //saving the cart item to localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        [addToCart.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        },
        [removeFromCart.pending]: (state) => {
            state.loading = "loading"
        },
        [removeFromCart.fulfilled]: (state, action) => {
            state.loading = "loaded"

            //get the id of the item to be removed.
            const itemId = action.payload.id;

            //get the index of the item to be removed.
            const index = state.cartItems.findIndex(cartItem => cartItem.productId === itemId);
            state.cartItems.splice(index, 1);

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },
        [removeFromCart.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        },
    }
});

//selectors
export const selectFromCart = state => state.cart;

export default cartSlice.reducer;
