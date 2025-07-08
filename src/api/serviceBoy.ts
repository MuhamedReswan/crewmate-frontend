import { AxiosResponse } from "axios";
import API from "@/services/axios";
// error hander
import { serviceBoyRoutes } from "@/services/endPoints/serviceBoy.endPoints";
import { ServiceBoy } from "@/types/users.type";
import { LoginFormInputs, SignupFormData } from "@/types/form.type";
import {
  GoogleLoginData,
  Otp,
  ProfileData,
  ResetForgotPassword,
  ResponseResult,
} from "@/types/auth.type";
import { Role } from "@/types/enum.type";
import { ApiResponse } from "@/types/ApiResponse";

export const serviceBoyLogin = async (
  data: LoginFormInputs
): Promise<ServiceBoy | undefined> => {
  try {
    const { email, password } = data;
    const result: AxiosResponse<ServiceBoy> = await API.post(
      serviceBoyRoutes.login,
      { email, password }
    );
    console.log("result", result);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const serviceBoyRegister = async (
  data: SignupFormData
): Promise<ServiceBoy | undefined> => {
  try {
    console.log("serviceBoyRegister", data);
    delete data.terms;
    delete data.confirmPassword;

    const result: AxiosResponse<ServiceBoy> = await API.post(
      serviceBoyRoutes.register,
      data
    );
    console.log("serviceBoyRegister of result", result);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const serviceBoyOtpVerification = async (
  data: Otp
): Promise<ApiResponse<Partial<ServiceBoy> | undefined>> => {
  try {
    console.log("serviceBoyOtpVerification", data);
    const otpResult: AxiosResponse<ApiResponse<Partial<ServiceBoy>>> = await API.post(
      serviceBoyRoutes.otpVerification,
      data
    );
    console.log("otpResul", otpResult);
    return otpResult.data;
  } catch (error) {
    console.log("api error serviceBoyOtpVerification1 ", error);
    throw error;
  }
};

export const serviceBoyLogout = async (): Promise<boolean | undefined> => {
  try {
    console.log("logout frin api forn invoked");
    const logout: AxiosResponse<boolean> = await API.post(
      serviceBoyRoutes.logout
    );
    console.log("service boy logout response", logout);
    if (logout) {
      return logout.data;
    }
  } catch (error) {
    console.log("error logout",error);
    throw error;
  }
};

export const googleAuth = async (data: GoogleLoginData) => {
  try {
   const result =  await API.post(serviceBoyRoutes.googleAuth, data );
   console.log("result of google auth in servie boy",result);
   return result.data
  } catch (error) {
    console.log("error googleAuth",error);
    throw error;
  }
};

export const serviceBoyResendOtp = async (
  data: Otp
): Promise<ResponseResult | undefined> => {
  try {
    console.log("serviceBoyResendOtp", data);
    const result: AxiosResponse = await API.post(
      serviceBoyRoutes.resendOtp,
      data
    );
    console.log("serviceBoyResendOtp", result);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const serviceBoyForgotPassword = async (data: {
  email: string;
  role?: Role;
}): Promise<ResponseResult | undefined> => {
  try {
    console.log("serviceBoyForgotPassword", data);
    delete data.role;
    const result: AxiosResponse = await API.post(
      serviceBoyRoutes.forgotPassword,
      data
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const serviceBoyResetPassword = async (
  data: ResetForgotPassword
): Promise<ResponseResult | undefined> => {
  try {
    const result = await API.patch(serviceBoyRoutes.resetPassword, data);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const ServiceBoyAccessToken = async ():Promise<ResponseResult | undefined> => {
  try {
    console.log("token api call inovked")
    const result = await API.post(serviceBoyRoutes.refreshToken);
    // const data = await await result.json();
    // console.log("token-test response json",data); // See it in the browser's console
    return result.data;
  } catch (error) {
    console.log(error)
    throw error;
  }

}



export const ServiceBoyAccessProfile = async (): Promise<ResponseResult | undefined> => {
  try {
    const result = await API.get(serviceBoyRoutes.profile);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error
  }
}



export const ServiceBoyUpdateProfile = async (data:FormData): Promise<ResponseResult | undefined> => {
  try {
    console.log("ServiceBoyUpdateProfile called")
    const result = await API.put(serviceBoyRoutes.profile,data,{
      headers: {
    "Content-Type": "multipart/form-data"
  }}
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error
  }
}



export const ServiceBoyFetchProfile = async (id:string): Promise<ResponseResult<ProfileData> | undefined> => {
  try {
    console.log("ServiceBoyFetchProfile called")
    const result = await API.get<ResponseResult<ProfileData>>(`${serviceBoyRoutes.profile}/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error
  }
}




