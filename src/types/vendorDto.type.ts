import { Role } from "./enum.type";

export type VendorLoginDTO = {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isBlocked: boolean;
  role: Role;
}