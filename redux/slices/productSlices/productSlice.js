import {createSlice} from "@reduxjs/toolkit";
import {getAllProducts, getAProduct} from "./productAPI";
import products from "../../../data/products";

const initialState = {
    loading: "idle",
    products: [],
    product: {},
    errorMsg: "",
    serverMsg: "",
    success: false
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllProducts.pending]: (state) => {
            state.loading = "loading"
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.products = action.payload.products;
        },
        [getAllProducts.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        },
        [getAProduct.pending]: (state) => {
            state.loading = "loading"
        },
        [getAProduct.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.product = action.payload.product;
        },
        [getAProduct.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        }
    }
});

//selectors
export const selectProducts = state => state.products;

export default productsSlice.reducer;
