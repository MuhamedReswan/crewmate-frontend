import API from "@/services/axios"
import { adminRoutes } from "@/services/endPoints/admin.endPoints"
import { LoginFormInputs } from "@/types/form.type"
import { Admin } from "@/types/users.type"

export const Login = async (data: LoginFormInputs):Promise<Admin>  =>{
    const {email, password} = data;
    try {
        const response = await API.post(adminRoutes.login,{email, password});
        console.log("api response admin call",response);
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const logout = async (): Promise<boolean | undefined> => {
    try {
        const response = await API.post(adminRoutes.logout,{});
        return  response.data
    } catch (error) {
        console.log("error",error);
    }
}