
import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name:'expenses',
    initialState:{
        expenses:[],
        totalExpense:0
    },
    reducers:{
        allExpenses(state,action){
            state.expenses=action.payload.expenses
            state.totalExpense = action.payload.totalExpenses
        }
    }

})

export const expenseActions = expenseSlice.actions

export default expenseSlice