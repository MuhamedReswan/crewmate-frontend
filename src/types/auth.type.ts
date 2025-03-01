import { Role } from "./enum.type";
import { ServiceBoy, Vendor } from "./users.type";

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

export interface ResponseResult {
  message: string;
  statusCode: number;
  data: any | null;
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