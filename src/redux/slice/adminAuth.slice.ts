import { AdminState } from "@/types/auth.type";
import { Role } from "@/types/enum.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminState = {
    adminStatus : false,
    adminData : null
}


const adminAuthSlice = createSlice({
    name:Role.ADMIN,
    initialState:initialState,


    reducers:{
        adminLogin: (state, action) => {
            state.adminStatus= true;
            state.adminData = action.payload;
        },


        adminLogout: (state) => {
            state.adminData = null;
            state.adminStatus = false;
        }
    }
});

const {adminLogin, adminLogout} = adminAuthSlice.actions;
export {adminLogin, adminLogout} 
export default adminAuthSlice.reducer;
