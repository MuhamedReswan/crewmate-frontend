import { createSlice } from "@reduxjs/toolkit";
import { VendorState } from "@/types/auth.type";
import { Role } from "@/types/enum.type";



const initialState: VendorState = {
  vendorStatus: false,
  vendorData: null,
};

const vendorAuthSlice = createSlice({
  name: Role.VENDOR,
  initialState: initialState,

  reducers: {
    vendorLogin: (state, action) => {
      state.vendorData = action.payload;
      state.vendorStatus = true;
    },

    vendorLogout: (state) => {
      state.vendorData = null;
      state.vendorStatus = false;
    },
  },
});

const { vendorLogin, vendorLogout } = vendorAuthSlice.actions;
export { vendorLogin,  vendorLogout};
export default vendorAuthSlice.reducer
