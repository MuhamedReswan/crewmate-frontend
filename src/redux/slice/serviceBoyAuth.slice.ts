import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceBoyState } from "@/types/auth.type";
import { Role } from "@/types/enum.type";
import { ServiceBoy } from "@/types/users.type";




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
        },


        updateServiceBoyData: (
  state,
  action: PayloadAction<Partial<Partial<ServiceBoy>>>
) => {
  if (state.serviceBoyData) {
    state.serviceBoyData = { ...state.serviceBoyData, ...action.payload };
  }
},
    }
});


 const {login, logout,updateServiceBoyData} = serviceBoyAuthSlice.actions;
 export {login, logout,updateServiceBoyData};
export default serviceBoyAuthSlice.reducer;