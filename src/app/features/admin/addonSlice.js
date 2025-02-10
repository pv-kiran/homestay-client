import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addOns: null
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
        }
    }
})



export default addOnSlice.reducer
export const { setAddOns, clearAddOns } = addOnSlice.actions;