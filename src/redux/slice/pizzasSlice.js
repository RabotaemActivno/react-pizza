import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params, thunkApi) => {
        const { order, sortBy, category, search, currentPage } = params;
        const { data } = await axios.get(`https://648086cff061e6ec4d49700f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
        return data;
    });

const initialState = {
    items: [],
    status:'loading', //loading |success| error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state,action) => {
            state.status = 'success';
            state.items = action.payload;
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    }
});

export const selectPizzaData = state => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
