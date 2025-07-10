// useLoginForm.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validation/validationSchema';
import { LoginFormInputs } from '@/types/form.type';
import {  serviceBoyLogin } from '@/api/serviceBoy';
import { Role } from '@/types/enum.type';
import { vendorLogin } from '@/api/vendor';
import { Login } from '@/api/admin';
import { ApiResponse } from '@/types/ApiResponse';
import { isAxiosError } from 'axios';
 


export interface UseLoginFormProps<T extends ApiResponse = ApiResponse> {
  onLoginSuccess?: (data: T) => void;
  onLoginError?: (error: unknown) => void;
  loginType?: Role;
}

export const useLoginForm = <T extends ApiResponse = ApiResponse>({
  onLoginSuccess,
  onLoginError,
  loginType,
}: UseLoginFormProps<T> = {}) => {

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });
  

  
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log("data from the useLogin on submit",data)
      setIsLoading(true);
let result: T | undefined;
      if(loginType===Role.VENDOR){
        result= await vendorLogin(data) as T
        }else if(loginType === Role.SERVICE_BOY) {
          result= await serviceBoyLogin(data) as T
      }else if( loginType === Role.ADMIN){
        result = await Login(data)as T
        console.log("admin login form useLoginForm")
      }
      console.log("result of login",result)
      if(result && result.statusCode === 200){
        onLoginSuccess?.(result);
      }
    } catch (error) {

       if (isAxiosError(error) && error.response) {
    onLoginError?.(error.response.data);
  } else {
    console.error("Unknown error", error);
    onLoginError?.({ message: "Unexpected error occurred", statusCode: 500, data: null });
  }

    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
    register: form.register,
    errors: form.formState.errors,
    reset: form.reset,
    watch: form.watch,
    setValue: form.setValue,
    formState: form.formState
  };
};

