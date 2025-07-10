import { Role } from "./enum.type";
import { Admin, ServiceBoy, Vendor } from "./users.type";



type AllowedDataTypes = Partial<ServiceBoy> | Partial<Vendor> | Partial<Admin>


export interface ApiResponse<T = Partial<AllowedDataTypes>>    {
    message: string;
    statusCode: number;
    data: T | null;
    role?: Role
  }