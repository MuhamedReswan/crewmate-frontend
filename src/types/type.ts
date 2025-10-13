import { LocationData } from "./form.type";

export interface MessageProps {
  message: string;
  className?: string;
}

export interface Event {
  _id: string;
  customerName: string;
  vendorId: string;
  typeOfWork: string;
  typeOfService: string;
  serviceBoys: number;
  eventLocation: LocationData;
  bookedBoys: number;
  status: string;
  paymentStatus: string;
  bookings: string; // to change
  overTime: number;
  totalBill: number;
  ratings: string;
  reportingDateTime:Date;
  noOfPax: number;
  bonus: number;
}

