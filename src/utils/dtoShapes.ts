import { ServiceBoyLoginDTO } from "@/types/apiTypes/serviceBoyDto.type";

export const serviceBoyLoginShape: ServiceBoyLoginDTO = {
  _id: "",
  name: "",
  email: "",
  isVerified: false,
  isBlocked: false,
  role: "",
};

export const VendorLoginShape: ServiceBoyLoginDTO = {
  _id: "",
  name: "",
  email: "",
  isVerified: false,
  isBlocked: false,
  role: "",
};
