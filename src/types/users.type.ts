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



export interface Vendor extends CommonDetails  {
location: string, 

}



export interface UnAvailable {
    date:Date,
    reason:string
}
export interface ServiceBoy extends CommonDetails{
    profileImage:string,
    isBlocked:boolean,
    aadharNumber:string,
    servicerId:string,
    role:string; 
    location:object,
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
    location: string, 
    profileImage:string,
    isBlocked:boolean,
    aadharNumber:string,
    role:string; 
    age:number,
    qualification:string,
    offDates:UnAvailable[]
    date:Date,
    walletId:string,
    workHistoryId:string  
}




