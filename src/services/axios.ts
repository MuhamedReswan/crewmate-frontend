import { adminLogout } from "@/redux/slice/adminAuth.slice";
import { logout } from "@/redux/slice/serviceBoyAuth.slice";
import { vendorLogout } from "@/redux/slice/vendorAuth.slice";
import store from "@/redux/store/store";
import { getRoleFromUrl } from "@/utils/getRoleFromUrl";
import axios, { AxiosInstance, AxiosResponse, HttpStatusCode } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  // headers: {
  //   // "Content-Type": "application/json",
  //   "Content-Type": "multipart/form-data",
  // },
  withCredentials: true,
});

API.interceptors.response.use(
  (response: AxiosResponse) => response,

  // Error handler
  async (error) => {
    const originalRequest = error?.config;
    if (
      error.response &&
      error.response.status === HttpStatusCode.Unauthorized &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      // Find user role from url
      const role = getRoleFromUrl(error.config?.url);
      console.log("Role from URL:", role);

      switch (role) {
        case "admin":
          store.dispatch(adminLogout());
          break;
        case "vendor":
          store.dispatch(vendorLogout());
          break;
        case "service-boy":
          store.dispatch(logout());
          break;
        default:
          console.error("Could not determine role from URL");
          return Promise.reject(error);
      }

      return API(originalRequest);
    }
    return Promise.reject(error); // Good practice to return a rejected promise for error cases
  }
);

export default API;
