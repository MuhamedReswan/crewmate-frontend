// useLoginForm.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validation/validationSchema';
import { LoginFormInputs } from '@/types/form.type';
import {  serviceBoyLogin } from '@/api/serviceBoy';
import { Role } from '@/types/enum.type';
import { ResponseResult } from '@/types/auth.type';
import { vendorLogin } from '@/api/vendor';
 
type LoginType = Role 

export interface UseLoginFormProps {
    onLoginSuccess?: (data: ResponseResult) => void;
    onLoginError?: (error: unknown) => void;
    loginType?:LoginType 
  }

export  const useLoginForm = ({ onLoginSuccess, onLoginError,loginType }: UseLoginFormProps = {}) => {
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
      let result;
      if(loginType===Role.VENDOR){
        result= await vendorLogin(data)
        }else {
          result= await serviceBoyLogin(data)
      }
      console.log("result of login",result)
      if(result && result.statusCode === 200){
        onLoginSuccess?.(result);
      }
    } catch (error) {
      onLoginError?.(error.response.data);
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

