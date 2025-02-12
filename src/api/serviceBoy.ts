import { Axios, AxiosResponse } from "axios";
import API from "@/services/axios"; 
// error hander
import { serviceBoyRoutes } from "@/services/endPoints/serviceBoy.endPoints";
import { ServiceBoy } from "@/types/users.type"; 
import { SignupFormData } from "@/types/form.type";
import { GoogleLoginData, Otp } from "@/types/auth.type";

export const login = async (email:string, password:string):Promise <ServiceBoy | undefined> => {
    try {
        const result: AxiosResponse<ServiceBoy> =  await API.post(serviceBoyRoutes.login,{email,password});
        console.log("result",result);
        return result.data;
    } catch (error) { 
        console.log(error);
    }
}


export const serviceBoyRegister = async (data: SignupFormData ):Promise <ServiceBoy | undefined> => {
    try {
        console.log("serviceBoyRegister",data)
        delete data.terms;
        delete data.confirmPassword;
        
        const result: AxiosResponse<ServiceBoy> =  await API.post(serviceBoyRoutes.register,data);
        console.log("serviceBoyRegister of result",result);
        return result.data;
    } catch (error) { 
        console.log(error);
    }
}

export const otpVerification = async (data:Otp): Promise <ServiceBoy | undefined> => {
    try {
        const otpResult : AxiosResponse<ServiceBoy> = await API.post(serviceBoyRoutes.otpVerification,data);
        console.log("otpResul",otpResult)
        return otpResult.data;
    } catch (error) {
        console.log(error); 
    }
}


    export const googleAuth = async (data:GoogleLoginData) => {
        try {
            await API.post(serviceBoyRoutes.googleAuth, {data});

        } catch (error) {
            console.log(error);
        }

    }
