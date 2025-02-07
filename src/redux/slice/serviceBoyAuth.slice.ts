import { createSlice } from "@reduxjs/toolkit";

interface serviceBoyState {
    serviceBoyStatus: boolean;
    serviceBoyData:{
        id: string | null;
        name: string | null;
        email: string | null
    }
}


    const intialState: serviceBoyState = {
        serviceBoyStatus:false,
        serviceBoyData:{
            id:null,
            name: null,
            email: null
        }
}


const serviceBoyAuthSlice = createSlice({
    name: "serviceBoy",
    initialState:intialState,

    reducers:{
        login:(state, action)=>{
            state.serviceBoyStatus =true;
            state.serviceBoyData= {
              id:action.payload.id,
              name:action.payload.name,
              email: action.payload.email
            };
        },


        logout: (state) =>{
            state.serviceBoyStatus= false;
            state.serviceBoyData={
                id:null,
                name: null,
                email: null
            };         
        }
    }
});


 const {login, logout} = serviceBoyAuthSlice.actions;
 export {login, logout};
export default serviceBoyAuthSlice.reducer;