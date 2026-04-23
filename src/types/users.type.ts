import { Role, VerificationStatus } from "./enum.type";
import { LocationData } from "./form.type";
import { IImage, ISecureImage } from "./type";

export interface CommonDetails {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  profileImage: IImage;
  password: string;
  isVerified: VerificationStatus;
  rejectionReason?: string | null;
  isBlocked: boolean;
  role: Role;
}

export interface UnAvailable {
  date: Date;
  reason: string;
}
export interface ServiceBoy extends CommonDetails {

  aadharNumber: string;
  aadharImageFront: ISecureImage;
  aadharImageBack: ISecureImage;
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
}

export interface Vendor extends CommonDetails {
  location: LocationData;
  licenceImage: ISecureImage;
  licenceNumber: string;
  estd: string;
  instaId: string;
}

export interface Admin {
  name: string;
  email: string;
  role: string;
}
