import { Role, VerificationStatus } from "../enum.type";

export type ServiceBoyLoginDTO = {
  _id: string;
  name: string;
  email: string;
  isVerified: VerificationStatus;
  isBlocked: boolean;
  role: Role;
};
