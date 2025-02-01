

export interface UnAvailable {
    date:Date,
    reason:string
}

export default interface IServiceBoy  {
    _id:string;
    name:string, 
    email:string,
    mobile:string,
    password:string,
    isVerified:boolean,
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

