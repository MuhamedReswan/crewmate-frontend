import { Role } from "./enum.type";

export type ServiceBoyLoginDTO = {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isBlocked: boolean;
  role: Role;
}