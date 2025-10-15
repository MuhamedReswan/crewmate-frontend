import API from "@/services/axios";
// error hander
import { serviceBoyRoutes } from "@/services/endPoints/serviceBoy.endPoints";
import { ApiResponse, PaginatedResponse } from "@/types/apiTypes/ApiResponse";
import {
  GoogleLoginData,
  Otp,
  ProfileData,
  ResetForgotPassword,
} from "@/types/auth.type";
import { Role } from "@/types/enum.type";
import { LoginFormInputs, SignupFormData } from "@/types/form.type";
import { ServiceBoyLoginDTO } from "@/types/apiTypes/serviceBoyDto.type";
import { ServiceBoy } from "@/types/users.type";

export const serviceBoyLogin = async (
  data: LoginFormInputs
): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
  try {
    const { email, password } = data;
    const result = await API.post<ApiResponse<Partial<ServiceBoy>>>(
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
): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
  try {
    console.log("serviceBoyRegister", data);
    delete data.terms;
    delete data.confirmPassword;

    const result = await API.post<ApiResponse<Partial<ServiceBoy>>>(
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
    const otpResult = await API.post<ApiResponse<Partial<ServiceBoy>>>(
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

export const serviceBoyLogout = async (): Promise<
  ApiResponse<Partial<ServiceBoy>> | undefined
> => {
  try {
    console.log("logout frin api forn invoked");
    const logout = await API.post<ApiResponse<Partial<ServiceBoy>>>(
      serviceBoyRoutes.logout
    );
    console.log("service boy logout response", logout);
    if (logout) {
      return logout.data;
    }
  } catch (error) {
    console.log("error logout", error);
    throw error;
  }
};

export const googleAuth = async (
  data: GoogleLoginData
): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
  try {
    const result = await API.post<ApiResponse<Partial<ServiceBoy>>>(
      serviceBoyRoutes.googleAuth,
      data
    );
    console.log("result of google auth in servie boy", result);
    return result.data;
  } catch (error) {
    console.log("error googleAuth", error);
    throw error;
  }
};

export const serviceBoyResendOtp = async (
  data: Otp
): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
  try {
    console.log("serviceBoyResendOtp", data);
    const result = await API.post<ApiResponse<Partial<ServiceBoy>>>(
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
}): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
  try {
    console.log("serviceBoyForgotPassword", data);
    delete data.role;
    const result = await API.post<ApiResponse<Partial<ServiceBoy>>>(
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
): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
  try {
    const result = await API.patch<ApiResponse<Partial<ServiceBoy>>>(
      serviceBoyRoutes.resetPassword,
      data
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ServiceBoyAccessToken = async (): Promise<
  ApiResponse<Partial<ServiceBoy>> | undefined
> => {
  try {
    console.log("token api call inovked");
    const result = await API.post<ApiResponse<Partial<ServiceBoy>>>(
      serviceBoyRoutes.refreshToken
    );
    // const data = await await result.json();
    // console.log("token-test response json",data); // See it in the browser's console
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ServiceBoyAccessProfile = async (): Promise<
  ApiResponse<Partial<ServiceBoy>> | undefined
> => {
  try {
    const result = await API.get<ApiResponse<Partial<ServiceBoy>>>(
      serviceBoyRoutes.profile
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ServiceBoyUpdateProfile = async (
  data: FormData
): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
  try {
    console.log("ServiceBoyUpdateProfile called");
    const result = await API.put<ApiResponse<Partial<ServiceBoy>>>(
      serviceBoyRoutes.profile,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ServiceBoyFetchProfile = async (
  id: string
): Promise<ApiResponse<ProfileData> | undefined> => {
  try {
    console.log("ServiceBoyFetchProfile called");
    const result = await API.get<ApiResponse<ProfileData>>(
      `${serviceBoyRoutes.profile}/${id}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const RetryVerficationRequestServiceBoy = async (
  id: string
): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
  try {
    const url = serviceBoyRoutes.retryVerify.replace(":id", id);
    const response = await API.patch<
      ApiResponse<Partial<ServiceBoy>> | undefined
    >(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetServiceBoyById = async (
  id: string
): Promise<ApiResponse<ServiceBoyLoginDTO> | undefined> => {
  try {
    const url = serviceBoyRoutes.serviceBoyById.replace(":id", id);
    const response = await API.get<ApiResponse<ServiceBoyLoginDTO> | undefined>(
      url
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getWorks = async (
  params: any,
  serviceBoyId: string
): Promise<ApiResponse<PaginatedResponse<Event>> | undefined> => {
  try {
    console.log("serviceBoyId",serviceBoyId)
    // const url = serviceBoyRoutes.loadWorks.replace(":serviceBoyId", serviceBoyId);
    const url = serviceBoyRoutes.loadWorks
    const response = await API.get<ApiResponse<PaginatedResponse<Event>>>(url, {
      params,
    });
    console.log("getWorks response",response);
    if (!response) return;
    return response.data;
  } catch (error) {
    throw error;
  }
};
