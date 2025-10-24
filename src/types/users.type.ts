import { Role, VerificationStatus } from "./enum.type";
import { LocationData } from "./form.type";

export interface CommonDetails {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  isVerified: VerificationStatus;
  isBlocked: boolean;
  role: Role;
}

export interface UnAvailable {
  date: Date;
  reason: string;
}
export interface ServiceBoy extends CommonDetails {
  profileImage: string;
  aadharNumber: string;
  aadharImageFront: string;
  aadharImageBack: string;
  servicerId: string;
  location: LocationData;
  age: number;
  qualification: string;
  points: number;
  servicerID: string;
  offDates: UnAvailable[];
  date: Date;
  walletId: string;
  workHistoryId: string;
  rejectionReason: string | null;
}

export interface Vendor extends CommonDetails {
  location: LocationData;
  profileImage: string;
  licenceImage: string;
  licenceNumber: string;
  estd: string;
  instaId: string;
}

export interface Admin {
  name: string;
  email: string;
  role: string;
}
