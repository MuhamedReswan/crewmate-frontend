// useLoginForm.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validation/validationSchema';
import { LoginFormInputs } from '@/types/form.type';
import {  serviceBoyLogin } from '@/api/serviceBoy';
import { Role } from '@/types/enum.type';
import { ResponseResult } from '@/types/auth.type';
 
type LoginType = Role 

export interface UseLoginFormProps {
    onLoginSuccess?: (data: ResponseResult) => void;
    onLoginError?: (error: unknown) => void;
    loginType?:LoginType 
  }

export  const useLoginForm = ({ onLoginSuccess, onLoginError,loginType }: UseLoginFormProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
      setServerError(null);
      let result
      if(loginType===Role.VENDOR){
          console.log("else case of hook of login")
        }else if(loginType===Role.SERVICE_BOY){
          result= await serviceBoyLogin(data)
      }
      if(!result) return
      onLoginSuccess?.(result);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'An error occurred');
      onLoginError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    serverError,
    onSubmit: form.handleSubmit(onSubmit),
    register: form.register,
    errors: form.formState.errors,
    reset: form.reset,
    watch: form.watch,
    setValue: form.setValue,
    formState: form.formState
  };
};

