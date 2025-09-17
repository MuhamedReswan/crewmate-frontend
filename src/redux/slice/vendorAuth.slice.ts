import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VendorState } from "@/types/auth.type";
import { Role } from "@/types/enum.type";
import { Vendor } from "@/types/users.type";



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
           updateVendorData: (
  state,
  action: PayloadAction<Partial<Partial<Vendor>>>
) => {
  if (state.vendorData) {
    state.vendorData = { ...state.vendorData, ...action.payload };
  }
},
  },
});

const { vendorLogin, vendorLogout, updateVendorData } = vendorAuthSlice.actions;
export { vendorLogin,  vendorLogout, updateVendorData};
export default vendorAuthSlice.reducer
