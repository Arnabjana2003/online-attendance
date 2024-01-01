
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    authData: {}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state,action)=>{
            state.status = true;
            state.authData = action.payload
        },
        logout: (state)=>{
            state.status = false;
            state.authData = {};
        }
    }
})

export default authSlice.reducer;
export const {login,logout} = authSlice.actions;