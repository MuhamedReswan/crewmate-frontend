import { Role } from "./enum.type";
import { Admin, ServiceBoy, Vendor } from "./users.type";

export interface ServiceBoyRegister {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface GoogleLoginData {
  googleToken:string
}

export interface Otp {
  otp?: string;
  email: string;
}

export interface ResponseResult<T = unknown> {
  message: string;
  statusCode: number;
  data: T | null;
  role?: Role
}

export interface ResetForgotPassword {
  email: string;
  token: string;
  password: string;
}

export interface ServiceBoyState {
  serviceBoyStatus: boolean;
  serviceBoyData:Partial<ServiceBoy> | null
}


export interface VendorState {
  vendorStatus: boolean;
  vendorData: Partial<Vendor> | null;
}

export interface AdminState {
  adminStatus : boolean;
  adminData : Partial<Admin> | null
}

// export interface ProfileData {
//   serviceBoyData:Partial<ServiceBoy> | null
// }
export type VendorProfileData = Partial<Vendor>
export type ProfileData = Partial<ServiceBoy>