import { AxiosResponse } from "axios";
import API from "@/services/axios"; 
// error hander
import { serviceBoyRoutes } from "@/services/endPoints/serviceBoy.endPoints";
import { ServiceBoy } from "@/types/users.type"; 
import { LoginFormInputs, SignupFormData } from "@/types/form.type";
import { GoogleLoginData, Otp, ResponseResult } from "@/types/auth.type";

export const serviceBoyLogin = async (data:LoginFormInputs):Promise <ServiceBoy | undefined> => {
    try {
        const {email,password}= data
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
        throw error;
    }
}

export const serviceBoyOtpVerification = async (data:Otp): Promise <ServiceBoy | undefined> => {
    try {
        console.log("serviceBoyOtpVerification",data);
        const otpResult : AxiosResponse<ServiceBoy> = await API.post(serviceBoyRoutes.otpVerification,data);
        console.log("otpResul",otpResult)
        return otpResult.data;
    } catch (error) {
        console.log("api error serviceBoyOtpVerification1 ",error); 
        throw  error;
    }
}

export const serviceBoyLogout  = async (): Promise <boolean | undefined> => {
    try {
        console.log("logout frin api forn invoked")
        const logout : AxiosResponse<boolean> = await API.post(serviceBoyRoutes.logout);
        console.log("service boy logout response",logout);
        if(logout){
            return logout.data;
        }
    } catch (error) {
        console.log(error)
    }
}


    export const googleAuth = async (data:GoogleLoginData) => {
        try {
            await API.post(serviceBoyRoutes.googleAuth, {data});

        } catch (error) {
            console.log(error);
        }
    }


    export const serviceBoyResendOtp = async (data:Otp): Promise <ResponseResult | undefined> => {
        try {
            console.log("serviceBoyResendOtp",data);
            const result : AxiosResponse = await API.post(serviceBoyRoutes.resendOtp,data);
            console.log("serviceBoyResendOtp",result);
           return result.data;
        } catch (error) {
            console.log(error);
        }
    }



    