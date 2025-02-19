import { loginSchema, signupSchema } from "@/validation/validationSchema";
import { z } from "zod";

export interface SignUpFormInputs {
    name: string;
    email: string;
    mobile?: string;
    password?: string;
    confirmPassword?: string;
    terms:boolean
  }
  
  export interface LoginFormInputs {
    email: string;
    password: string;
    rememberMe?: boolean;
  }


// Type for form validation
export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;