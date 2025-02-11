import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addOns: null,
    selectedItems: {
        restaurants: {},
        homelyFoods: {},
        otherServices: {},
        roomServices: {},
        rides: {},
        entertainments: {},
    },
}


const addOnSlice = createSlice({
    name: 'addOns',
    initialState,
    reducers: {
        setAddOns: (state, { payload }) => {
            state.addOns = payload
        },
        clearAddOns: (state) => {
            state.addOns = null
        },
        toggleMenuItem: (state, action) => {
            const { section, id, item } = action.payload;
            const updatedSection = { ...state.selectedItems[section] };

            if (updatedSection[id]) {
                delete updatedSection[id];
            } else {
                updatedSection[id] = { ...item, quantity: 1 };
            }

            state.selectedItems[section] = updatedSection;
        },
        updateQuantity: (state, action) => {
            const { section, id, quantity } = action.payload;

            if (state.selectedItems[section][id]) {
                state.selectedItems[section][id].quantity = quantity;
            }
        },
    }
})



export default addOnSlice.reducer
export const {
    setAddOns,
    clearAddOns,
    toggleMenuItem,
    updateQuantity
} = addOnSlice.actions;