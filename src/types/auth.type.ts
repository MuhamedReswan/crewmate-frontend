import { Role } from "./enum.type";

export interface ServiceBoyRegister {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface GoogleLoginData {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
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