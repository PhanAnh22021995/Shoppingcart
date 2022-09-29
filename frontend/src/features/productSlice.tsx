import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: { products: []; status: any; loading: boolean } = {
  products: [],
  status: null,
  loading: false,
};

const listProducts = `http://localhost:4000/api/products`;

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const res = await axios.get(listProducts);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending.toString()]: (state, action) => {
      state.status = "pending";
      state.loading = true;
    },
    [productsFetch.fulfilled.toString()]: (state, action) => {
      state.products = action.payload;
      state.status = "success";
      state.loading = false;
    },
    [productsFetch.rejected.toString()]: (state, action) => {
      state.status = "reject";
      state.loading = false;
    },
  },
});

export default productsSlice.reducer;
