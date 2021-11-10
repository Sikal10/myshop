import {createAsyncThunk} from "@reduxjs/toolkit";
import {NEXT_API} from "../../../config/config";
import axios from "axios";

export const addToCart = createAsyncThunk("cart/addToCart", async (cartDetails, thunkAPI) => {
    const {id, qty} = cartDetails;

    try {
        const {data} = await axios.get(`${NEXT_API}/api/products/${id}`);
        return {
            productId: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            countInStock: data.product.countInStock,
            qty: Number(qty)
        };
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (id, thunkAPI) => {
    try {
        return {
            id
        }
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});


