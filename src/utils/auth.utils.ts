import { adminLogout } from "@/redux/slice/adminAuth.slice";
import { logout } from "@/redux/slice/serviceBoyAuth.slice";
import { vendorLogout } from "@/redux/slice/vendorAuth.slice";
import store, { persistor, RootState } from "@/redux/store/store";

export const getCurrentUserRole = (state: RootState) => {
  if (state.admin.adminStatus) return "admin";
  if (state.vendor.vendorStatus) return "vendor";
  if (state.serviceBoy.serviceBoyStatus) return "service-boy";
  return null;
};

export const clearAllAuthState = async () => {
  store.dispatch(adminLogout());
  store.dispatch(vendorLogout());
  store.dispatch(logout());

  await persistor.purge(); // clear localStorage
};
