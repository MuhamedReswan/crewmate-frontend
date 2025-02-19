import { ServiceBoy, Vendor } from "./users.type";



type AllowedDataTypes = Partial<ServiceBoy> | Partial<Vendor>


export interface ApiResponse<T = Partial<AllowedDataTypes>>    {
    message: string;
    statusCode: number;
    data: T | null;
  }