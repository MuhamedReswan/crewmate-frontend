import { AxiosResponse } from "axios";
import API from "../services/axios";
// error hander
import { serviceBoyRoutes } from "../services/endPoints/serviceBoy.endPoints";
import IServiceBoy from "../types/serviceBoy.type";

export const login = async (email:string, password:string):Promise <IServiceBoy | undefined> => {
    try {
        const result: AxiosResponse<IServiceBoy> =  await API.post(serviceBoyRoutes.login,{email,password});
        console.log("result",result);
        return result.data;
    } catch (error) { 
        console.log(error);
    }
}