import { LocationData } from "./form.type";

export interface MessageProps {
  message: string;
  className?: string;
}

export interface Event {
  _id: string;
  CustomerName: String;
  VendorId: string;
  TypeOfWork: String;
  TypeOfService: String;
  NeededBoys: Number;
  Location: LocationData;
  BookedBoys: Number;
  Status: String;
  PaymentStatus: String;
  Bookings: string; // to change
  OverTime: Number;
  TotalBill: Number;
  Ratings: string;
  Date: Date;
  ReportingTime: String;
  NoOfPax: Number;
  Bonus: Number;
}

