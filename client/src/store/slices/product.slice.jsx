import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an async thunk to fetch data
export const fetchData = createAsyncThunk('product/fetchData', async () => {
    try {
        const response = await axios.get('https://www.api.bkexporttradeco.store/api/get-products');
        return response.data.data; // Return the fetched data
    } catch (error) {
        // Handle errors if any
        console.log(error)
        throw Error('Error fetching data');
    }
});

// Define your Redux slice
const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        // Define additional reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading'; // Set status to loading while fetching data
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded if data fetching is successful
                state.data = action.payload; // Update state with fetched data
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed if data fetching fails
                state.error = action.error.message; // Update state with error message
            });
    },
});

// Export actions and reducer
export const { /* Define additional actions if needed */ } = productSlice.actions;
export default productSlice.reducer;
