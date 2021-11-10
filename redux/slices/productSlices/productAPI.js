import {createAsyncThunk} from "@reduxjs/toolkit";
import {NEXT_API} from "../../../config/config";
import axios from "axios";

export const getAllProducts = createAsyncThunk("products/getAllProducts", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${NEXT_API}/api/products`);
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});

export const getAProduct = createAsyncThunk("products/getAProduct", async (id, thunkAPI) => {
    try {
        const response = await axios.get(`${NEXT_API}/api/products/${id}`);
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});
