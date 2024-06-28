import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast'

const serializedData = sessionStorage.getItem('cart');
const preloadedState = serializedData ? JSON.parse(serializedData) : undefined;
const initialState = {
    items: preloadedState ? preloadedState.items : [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);
            if (existingItem) {
                existingItem.quantity += newItem.quantity;
                toast.success("Item Quantity Increase")

            } else {
                state.items.push(newItem);
                toast.success("Item Added To Cart")
            }
        },
        removeItem: (state, action) => {
            const itemIdToRemove = action.payload;
            console.log(itemIdToRemove)
            state.items = state.items.filter(item => item._id !== itemIdToRemove);
            toast.success("Item Removed")

        },
        updateQuantity: (state, action) => {
            const { itemId, newQuantity } = action.payload;
            const itemToUpdate = state.items.find(item => item._id === itemId);
            if (itemToUpdate) {
                itemToUpdate.quantity = newQuantity;
                // toast.success("Item Removed")

            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;


export default cartSlice.reducer;
