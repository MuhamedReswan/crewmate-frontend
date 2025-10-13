import { Role } from "../enum.type";
import { Event } from "../type";
import { Admin, ServiceBoy, Vendor } from "../users.type";

type AllowedDataTypes = Partial<ServiceBoy> | Partial<Vendor> | Partial<Admin> | Partial<Event>;

export interface ApiResponse<T = Partial<AllowedDataTypes>> {
  message: string;
  statusCode: number;
  data?: T | null;
  role?: Role;
}

export interface GetServiceBoysParams {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  isBlocked?: boolean;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}
