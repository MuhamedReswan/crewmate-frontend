import { forgotPasswordSchema, loginSchema, passwordSchema, profileSchema, signupSchema } from "@/validation/validationSchema";
import { z } from "zod";
import { Role } from "./enum.type";
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

  export interface ForgotPasswordModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    role: Role; 
  }



// Type for form validation
export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;

