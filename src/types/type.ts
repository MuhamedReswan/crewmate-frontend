import { BookingStatus } from "./enum.type";
import { LocationData } from "./form.type";
import { Vendor } from "./users.type";

export interface MessageProps {
  message: string;
  className?: string;
}


export interface Event {
  _id: string;
  customerName: string;
  eventLocation: LocationData;
  noOfPax: number;
  overTime: number;
  reportingDateTime: string;
  serviceBoys: number;
  status: string;
  totalBill: number;
  travelExpense: number;
  typeOfService: string;
  typeOfWork: string;
  vendor: Vendor;
  bonus?: number;
  wagePerBoy:number
  bookingStatus:BookingStatus;
  createdAt: string;
  updatedAt: string;
}


export interface EventQueryParams {
  search?: string;
  status?: string;
  page: number;
  limit: number;
  from?: string;
  to?: string;
}

