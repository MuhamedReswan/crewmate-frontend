import { Role, VerificationStatus } from "../enum.type";

export interface VendorLoginDTO {
  _id: string;
  name: string;
  email: string;
  isVerified: VerificationStatus;
  isBlocked: boolean;
  role: Role;
  rejectionReason?:string | null;

}
