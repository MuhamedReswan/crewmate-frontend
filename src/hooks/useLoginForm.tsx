// useLoginForm.ts
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Login } from '@/api/admin/admin';
import { serviceBoyLogin } from '@/api/serviceBoy/serviceBoy';
import { vendorLogin } from '@/api/vendor/vendor';
import { ApiResponse } from '@/types/ApiResponse';
import { Role } from '@/types/enum.type';
import { LoginFormInputs } from '@/types/form.type';
import { loginSchema } from '@/validation/validationSchema';



export interface UseLoginFormProps<T extends ApiResponse = ApiResponse> {
  // eslint-disable-next-line no-unused-vars
  onLoginSuccess?: (data: T) => void;
  // eslint-disable-next-line no-unused-vars
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
      console.log("data from the useLogin on submit", data)
      setIsLoading(true);
      let result: T | undefined;
      if (loginType === Role.VENDOR) {
        result = await vendorLogin(data) as T
      } else if (loginType === Role.SERVICE_BOY) {
        result = await serviceBoyLogin(data) as T
      } else if (loginType === Role.ADMIN) {
        result = await Login(data) as T
        console.log("admin login form useLoginForm")
      }
      console.log("result of login", result)
      if (result && result.statusCode === 200) {
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

