import { Role } from "../enum.type";

export interface VendorLoginDTO {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isBlocked: boolean;
  role: Role;
}
