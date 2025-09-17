import API from "@/services/axios";
// error hander
import { vendorRoutes } from "@/services/endPoints/vendor.endPoints";
import { ApiResponse } from "@/types/ApiResponse";
import {
  GoogleLoginData,
  Otp,
  ResetForgotPassword,
  VendorProfileData,
} from "@/types/auth.type";
import { Role } from "@/types/enum.type";
import { LoginFormInputs, SignupFormData } from "@/types/form.type";
import { Vendor } from "@/types/users.type";
import { VendorLoginDTO } from "@/types/vendorDto.type";

export const vendorLogin = async (
  data: LoginFormInputs
): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
  try {
    const { email, password } = data;
    const result = await API.post<ApiResponse<Partial<Vendor>>>(
      vendorRoutes.login,
      {
        email,
        password,
      }
    );
    console.log("result", result);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const vendorRegister = async (
  data: SignupFormData
): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
  try {
    console.log("vendorRegister", data);
    delete data.terms;
    delete data.confirmPassword;

    const result = await API.post<ApiResponse<Partial<Vendor>>>(
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
    const otpResult = await API.post<ApiResponse<Partial<Vendor>>>(
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

export const VendorLogoutApi = async (): Promise<
  ApiResponse<Partial<Vendor>> | undefined
> => {
  console.log("logout frin api forn invoked");
  const logout = await API.post<ApiResponse<Partial<Vendor>>>(
    vendorRoutes.logout
  );
  console.log("service boy logout response", logout);
  if (logout) {
    return logout.data;
  }
};

export const vendorGoogleAuth = async (
  data: GoogleLoginData
): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
  try {
    const response = await API.post<ApiResponse<Partial<Vendor>>>(
      vendorRoutes.googleAuth,
      data
    );
    return response.data;
  } catch (error) {
    console.log(" api error vendorGoogleAuth", error);
    throw error;
  }
};

export const vendorResendOtp = async (
  data: Otp
): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
  try {
    console.log("VendorResendOtp", data);
    const result = await API.post<ApiResponse<Partial<Vendor>>>(
      vendorRoutes.resendOtp,
      data
    );
    console.log("VenodrResendOtp", result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const vendorForgotPassword = async (data: {
  email: string;
  role?: Role;
}): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
  try {
    console.log("api vendor ForgotPassword", data);
    delete data.role;
    const result = await API.post<ApiResponse<Partial<Vendor>>>(
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
): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
  const result = await API.patch<ApiResponse<Partial<Vendor>>>(
    vendorRoutes.resetPassword,
    data
  );
  return result.data;
};

export const VendorUpdateProfile = async (
  data: FormData
): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
  console.log("ServiceBoyUpdateProfile called");
  const result = await API.put<ApiResponse<Partial<Vendor>>>(
    vendorRoutes.profile,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return result.data;
};

export const VendorFetchProfile = async (
  id: string
): Promise<ApiResponse<VendorProfileData> | undefined> => {
  try {
    console.log("VendorFetchProfile called");
    const result = await API.get<ApiResponse<VendorProfileData>>(
      `${vendorRoutes.profile}/${id}`
    );
    return result.data;
  } catch (error) {
    console.log("Error in VendorFetchProfile:", error);
    throw error;
  }
};


export const RetryVerficationRequestVendor = async (id: string): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
    try {
 const url = vendorRoutes.retryVerify.replace(":id", id);
         const response = await API.patch<ApiResponse<Partial<Vendor>> | undefined>(url);
        return response.data; 
    } catch (error) {
        throw error;  

    }
}


export const GetVendorById = async (id: string): Promise<ApiResponse<VendorLoginDTO> | undefined> => {
    try {
 const url = vendorRoutes.vendor.replace(":id", id);
         const response = await API.get<ApiResponse<VendorLoginDTO> | undefined>(url);
        return response.data; 
    } catch (error) {
        throw error;  
    }
}
