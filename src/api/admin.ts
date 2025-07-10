import API from "@/services/axios"
import { adminRoutes } from "@/services/endPoints/admin.endPoints"
import { ApiResponse } from "@/types/ApiResponse"
import { LoginFormInputs } from "@/types/form.type"
import { Admin } from "@/types/users.type"

export const Login = async (data: LoginFormInputs):Promise<ApiResponse<Partial<Admin>> | undefined> =>{
    const {email, password} = data;
    try {
        const response = await API.post<ApiResponse<Partial<Admin>>>(adminRoutes.login,{email, password});
        console.log("api response admin call",response);
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const logout = async (): Promise<ApiResponse<Partial<Admin>> | undefined> => {
    try {
        const response = await API.post<ApiResponse<Partial<Admin>>>(adminRoutes.logout,{});
        return  response.data
    } catch (error) {
        console.log("error",error);
    }
}