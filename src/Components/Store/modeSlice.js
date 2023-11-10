import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
    name:'mode',
    initialState:{mode:true},
    reducers:{
        changeMode(state){
            state.mode=!state.mode
        }
    }
})

export const modeActions = modeSlice.actions

export default modeSlice