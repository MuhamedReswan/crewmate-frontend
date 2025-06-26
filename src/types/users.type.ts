import { LocationData } from "./form.type";

export interface CommonDetails {
    _id:string;
    name:string, 
    email:string,
    mobile:string,
    password:string,
    isVerified:boolean,
    isBlocked:boolean,
    role:string; 
}







export interface UnAvailable {
    date:Date,
    reason:string
}
export interface ServiceBoy extends CommonDetails{
    profileImage:string,
    isBlocked:boolean,
    aadharNumber:string,
    aadharImageFront:string,
    aadharImageBack:string,
    servicerId:string,
    role:string; 
    location:LocationData,
    age:number,
    qualification:string,
    points:number,
    servicerID:string,
    offDates:UnAvailable[]
    date:Date,
    walletId:string,
    workHistoryId:string  
} 




export interface Vendor extends CommonDetails  {
    location: LocationData, 
    profileImage:string,
    licenceImage:string,
    licenceNumber:string,
estd:string
}



export interface Admin {
    name:string,
    email:string
}




