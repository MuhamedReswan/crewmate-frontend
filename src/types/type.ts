import { LocationData } from "./form.type";

export interface MessageProps {
  message: string;
  className?: string;
}

export interface Event {
  _id: string;
  customerName: String;
  vendorId: string;
  typeOfWork: String;
  typeOfService: String;
  serviceBoys: Number;
  eventLocation: LocationData;
  bookedBoys: Number;
  status: String;
  paymentStatus: String;
  bookings: string; // to change
  overTime: Number;
  totalBill: Number;
  ratings: string;
  date: Date;
  reportingTime: String;
  noOfPax: Number;
  bonus: Number;
}

