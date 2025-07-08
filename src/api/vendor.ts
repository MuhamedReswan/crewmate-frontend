import { AxiosResponse } from "axios";
import API from "@/services/axios";
// error hander
import { Vendor } from "@/types/users.type";
import { LoginFormInputs, SignupFormData } from "@/types/form.type";
import {
  GoogleLoginData,
  Otp,
  ResetForgotPassword,
  ResponseResult,
  VendorProfileData,
} from "@/types/auth.type";
import { vendorRoutes } from "@/services/endPoints/vendor.endPoints";
import { Role } from "@/types/enum.type";
import { ApiResponse } from "@/types/ApiResponse";

export const vendorLogin = async (
  data: LoginFormInputs
): Promise<Vendor | undefined> => {
  try {
    const { email, password } = data;
    const result: AxiosResponse<Vendor> = await API.post(vendorRoutes.login, {
      email,
      password,
    });
    console.log("result", result);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const vendorRegister = async (
  data: SignupFormData
): Promise<Vendor | undefined> => {
  try {
    console.log("vendorRegister", data);
    delete data.terms;
    delete data.confirmPassword;

    const result: AxiosResponse<Vendor> = await API.post(
      vendorRoutes.register,
      data
    );
    console.log("vendor of result", result);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const vendorOtpVerification = async (
  data: Otp
): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
  try {
    console.log("serviceBoyOtpVerification", data);
    const otpResult: AxiosResponse<ApiResponse<Partial<Vendor>>> = await API.post(
      vendorRoutes.otpVerification,
      data
    );
    console.log("otpResul", otpResult);
    return otpResult.data;
  } catch (error) {
    console.log("api error serviceBoyOtpVerification1 ", error);
    throw error;
  }
};

export const VendorLogoutApi = async (): Promise<ResponseResult | undefined> => {
    console.log("logout frin api forn invoked");
    const logout: AxiosResponse<ResponseResult> = await API.post(vendorRoutes.logout);
    console.log("service boy logout response", logout);
    if (logout) {
      return logout.data;
    }
};

export const vendorGoogleAuth = async (data: GoogleLoginData) => {
  try {
   const response = await API.post(vendorRoutes.googleAuth,data);
   return response.data
  } catch (error) {
    console.log(" api error vendorGoogleAuth",error);
    throw error;
  }
};

export const vendorResendOtp = async (
  data: Otp
): Promise<ResponseResult | undefined> => {
  try {
    console.log("VendorResendOtp", data);
    const result: AxiosResponse = await API.post(vendorRoutes.resendOtp, data);
    console.log("VenodrResendOtp", result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const vendorForgotPassword = async (data: {
  email: string;
  role?: Role;
}): Promise<ResponseResult | undefined> => {
  try {
    console.log("api vendor ForgotPassword", data);
    delete data.role;
    const result: AxiosResponse = await API.post(
      vendorRoutes.forgotPassword,
      data
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const vendorResetPassword = async (
  data: ResetForgotPassword
): Promise<ResponseResult | undefined> => {
  const result = await API.patch(vendorRoutes.resetPassword, data);
  return result.data;
};


export const VendorUpdateProfile = async (
  data:FormData
):Promise<ResponseResult | undefined> => {
  console.log("ServiceBoyUpdateProfile called")
  const result = await API.put(vendorRoutes.profile,data,{
      headers: {
    "Content-Type": "multipart/form-data"
  }}
  );
  return result.data;}


  export const VendorFetchProfile = async (id: string): Promise<ResponseResult<VendorProfileData> | undefined> => {
  try {
    console.log("VendorFetchProfile called");
    const result = await API.get<ResponseResult<VendorProfileData>>(`${vendorRoutes.profile}/${id}`);
    return result.data;
  } catch (error) {
    console.log("Error in VendorFetchProfile:", error);
    throw error;
  }
};
