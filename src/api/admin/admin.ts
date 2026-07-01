import API from "@/services/axios";
import { adminAuthRoutes, adminRoutes } from "@/services/endPoints/admin.endPoints";
import { ApiResponse, PaginatedResponse } from "@/types/apiTypes/ApiResponse";
import { UserType, VerificationStatus } from "@/types/enum.type";
import { LoginFormInputs } from "@/types/form.type";
import { Admin, ServiceBoy, Vendor } from "@/types/users.type";

export interface GetUserParams {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  isBlocked?: boolean;
}

export const Login = async (
  data: LoginFormInputs
): Promise<ApiResponse<Partial<Admin>> | undefined> => {
  const { email, password } = data;
  try {
    const response = await API.post<ApiResponse<Partial<Admin>>>(adminAuthRoutes.login, {
      email,
      password,
    });
    console.log("api response admin call", response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async (): Promise<ApiResponse<Partial<Admin>> | undefined> => {
  try {
    const response = await API.post<ApiResponse<Partial<Admin>>>(adminAuthRoutes.logout, {});
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

// Service Boy Api
// export const getServiceBoyVerificationRequests = async (): Promise<
//   ApiResponse<Partial<ServiceBoy[]>> | undefined
// > => {
//   try {
//     const response = await API.get<ApiResponse<Partial<ServiceBoy[]>>>(
//       adminRoutes.serviceBoyVerificationRequest
//     );
//     console.log("test+++=====", response.data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const verifyServiceBoyByAdmin = async (
//   id: string,
//   status: VerificationStatus,
//   reason?:string
// ): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
//   try {
//     const url = adminRoutes.verifyServiceBoyById.replace(":id", id);
//         const queryParams = new URLSearchParams({ status });

//     if (reason) queryParams.append("reason", reason);
//     console.log("reason in fornt,",reason)

//     const response = await API.patch<
//       ApiResponse<Partial<ServiceBoy>> | undefined
//     >(`${url}?${queryParams.toString()}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateServiceBoyBlockStatus = async (
//   id: string,
//   status: string
// ): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
//   try {
//     console.log("status", status);
//     const url = adminRoutes.updateStatusServiceBoyById
//       .replace(":id", id)
//       .replace(":status", status);
//     const response = await API.patch<
//       ApiResponse<Partial<ServiceBoy>> | undefined
//     >(`${url}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getServiceBoyById = async (
  url: string
): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
  try {
    console.log("url", url);
    const response = await API.get<ApiResponse<Partial<ServiceBoy>> | undefined>(`${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServiceBoys = async (
  params: GetUserParams
): Promise<ApiResponse<PaginatedResponse<ServiceBoy>> | undefined> => {
  try {
    console.log("getServiceBoys params", params);
    // const { page, limit, search, sort,  isBlocked } = params;
    const response = await API.get<ApiResponse<PaginatedResponse<ServiceBoy>> | undefined>(
      `${adminRoutes.LoadServiceBoys}`,
      { params }
    );
    console.log("result of getServiceBoys==", response);
    if (!response) return;
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Vendor Api
// export const getVendorVerificationRequests = async (): Promise<
//   ApiResponse<Partial<Vendor[]>> | undefined
// > => {
//   try {
//     const response = await API.get<ApiResponse<Partial<Vendor[]>>>(
//       adminRoutes.vendorVerificationRequest
//     );
//     console.log("test+++=====", response.data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const verifyVendorByAdmin = async (
//   id: string,
//   status: VerificationStatus,
//   reason?:string
// ): Promise<ApiResponse<Partial<ServiceBoy>> | undefined> => {
//   try {
//     const url = adminRoutes.verifyVendorById.replace(":id", id);
//     const queryParams = new URLSearchParams({ status });
//      if (reason) queryParams.append("reason", reason);
//     const response = await API.patch<
//       ApiResponse<Partial<ServiceBoy>> | undefined
//     >(`${url}?${queryParams.toString()}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getVendors = async (
  params: GetUserParams
): Promise<ApiResponse<PaginatedResponse<Vendor>> | undefined> => {
  try {
    console.log("getVendors params", params);
    // const { page, limit, search, sort,  isBlocked } = params;
    const response = await API.get<ApiResponse<PaginatedResponse<Vendor>> | undefined>(
      `${adminRoutes.LoadVendors}`,
      { params }
    );
    console.log("result of getVendorss==", response);
    if (!response) return;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVendorById = async (
  url: string
): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
  try {
    console.log("url", url);
    const response = await API.get<ApiResponse<Partial<Vendor>> | undefined>(`${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const updateVendorBlockStatus = async (
//   id: string,
//   status: string
// ): Promise<ApiResponse<Partial<Vendor>> | undefined> => {
//   try {
//     console.log("status", status);
//     const url = adminRoutes.updateStatusVendorById
//       .replace(":id", id)
//       .replace(":status", status);
//     const response = await API.patch<ApiResponse<Partial<Vendor>> | undefined>(
//       `${url}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// USER API===============================================================================================
export const userVerificationRequest = async <T>(
  userType: UserType
): Promise<ApiResponse<Partial<T[]> | undefined>> => {
  try {
    const url = adminRoutes.userVerificationRequest.replace(":userType", userType);

    const response = await API.get<ApiResponse<Partial<T[]>>>(url);
    console.log("test+++=====", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyUserByAdmin = async (
  userType: UserType,
  id: string,
  status: VerificationStatus,
  reason?: string
): Promise<ApiResponse<Partial<ServiceBoy | Vendor>> | undefined> => {
  try {
    const url = adminRoutes.verifyUserById.replace(":id", id).replace(":userType", userType);
    const queryParams = new URLSearchParams({ status });

    if (reason) queryParams.append("reason", reason);
    console.log("reason in fornt,", reason);

    const response = await API.patch<ApiResponse<Partial<ServiceBoy | Vendor>> | undefined>(
      `${url}?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserStatus = async (
  id: string,
  status: string,
  userType: UserType
): Promise<ApiResponse<Partial<Vendor | ServiceBoy>> | undefined> => {
  try {
    console.log("status", status);
    const url = adminRoutes.updateUserStatusById
      .replace(":id", id)
      .replace(":status", status)
      .replace(":userType", userType);
    const response = await API.patch<ApiResponse<Partial<Vendor>> | undefined>(`${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (
  params: GetUserParams,
  userType: UserType
): Promise<ApiResponse<PaginatedResponse<Vendor | ServiceBoy>> | undefined> => {
  try {
    console.log("getVendors params", params);
    // const { page, limit, search, sort,  isBlocked } = params;
    const url = adminRoutes.LoadUsers.replace(":userType", userType);
    const response = await API.get<ApiResponse<PaginatedResponse<Vendor | ServiceBoy>> | undefined>(
      `${url}`,
      { params }
    );
    console.log("result of getUsers==", response);
    if (!response) return;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (
  url: string
): Promise<ApiResponse<Partial<ServiceBoy | Vendor>> | undefined> => {
  try {
    console.log("url", url);
    if (url.includes(UserType.VENDOR)) {
      url.replace("UserType.VENDOR", `:${UserType.VENDOR}`);
    }

    if (url.includes(UserType.SERVICE_BOY)) {
      url.replace("UserType.SERVICE_BOY", `:${UserType.SERVICE_BOY}`);
    }
    console.log("url getUserById", url);

    const response = await API.get<ApiResponse<Partial<ServiceBoy | Vendor>> | undefined>(`${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
