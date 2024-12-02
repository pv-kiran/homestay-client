import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currency: JSON.parse(localStorage.getItem('currency')) ? JSON.parse(localStorage.getItem('currency')) : null
}

const authSlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrency: (state) => {
            state.currency = JSON.parse(localStorage.getItem('currency'))
        }
    }
})



export default authSlice.reducer
export const { setCurrency } = authSlice.actions;