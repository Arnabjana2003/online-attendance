import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstyear : [{name:"Arnab",roll:12},{name:"Ankita",roll:123}],
    secondyear : [],
    thirdyear : [],
    fourthyear : [],
}

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        firYr : (state,action)=>{
            state.firstyear = [...action.payload]
        },
        secYr : (state,action)=>{
            state.secondyear = [...action.payload]
        },
        thrdYr : (state,action)=>{
            state.thirdyear = [...action.payload]
        },
        frthYr : (state,action)=>{
            state.fourthyear = [...action.payload]
        }
    }
})

export default studentSlice.reducer
export const {firYr,secYr,thrdYr,frthYr} = studentSlice.actions