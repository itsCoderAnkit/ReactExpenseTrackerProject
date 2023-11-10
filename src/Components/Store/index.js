import { configureStore,  } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";
import modeSlice from "./modeSlice";


const store = configureStore({
    reducer:{auth:authSlice.reducer,expense:expenseSlice.reducer,mode:modeSlice.reducer}
})


export default store