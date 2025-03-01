import { ServiceBoyState } from "@/types/auth.type";
import { Role } from "@/types/enum.type";
import { createSlice } from "@reduxjs/toolkit";




    const intialState: ServiceBoyState = {
        serviceBoyStatus:false,
        serviceBoyData:null
}


const serviceBoyAuthSlice = createSlice({
    name: Role.SERVICE_BOY,
    initialState:intialState,

    reducers:{
        login:(state, action)=>{
            state.serviceBoyStatus =true;
            state.serviceBoyData= action.payload
        },


        logout: (state) =>{
            state.serviceBoyStatus= false;
            state.serviceBoyData=null       
        }
    }
});


 const {login, logout} = serviceBoyAuthSlice.actions;
 export {login, logout};
export default serviceBoyAuthSlice.reducer;