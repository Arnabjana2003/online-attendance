import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstyear : [],
    secondyear : [],
    thirdyear : [],
    fourthyear : [],
}

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        firstyear : (state,action)=>{
            state.firstyear = [...action.payload]
        },
        secondyear : (state,action)=>{
            state.secondyear = [...action.payload]
        },
        thirdyear : (state,action)=>{
            state.thirdyear = [...action.payload]
        },
        fourthyear : (state,action)=>{
            state.fourthyear = [...action.payload]
        },
        updateStudent: (state,action)=>{
            const studentsList = [...state[action.payload.year]]
            studentsList.forEach((student,index)=>{
                if(student.id == action.payload.id){
                    studentsList[index] = action.payload.data
                }
            })
            state[action.payload.year] = studentsList
        },
        deleteStudent: (state,action)=>{
            const studentsList = [...state[action.payload.year]]
            state[action.payload.year] = studentsList.filter(std=>std.id != action.payload.id)
        }
    }
})

export default studentSlice.reducer
export const {firstyear,secondyear,thirdyear,fourthyear,updateStudent,deleteStudent} = studentSlice.actions