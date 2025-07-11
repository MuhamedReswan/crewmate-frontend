import { z } from "zod";
import { Role } from "./enum.type";
import {
  forgotPasswordSchema,
  loginSchema,
  passwordSchema,
  profileSchema,
  signupSchema,
  vendorProfileSchema,
} from "@/validation/validationSchema";
import React from "react";
export interface SignUpFormInputs {
  name: string;
  email: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
  terms: boolean;
}

export interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ForgotPasswordModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  role: Role;
}

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

// Type for form validation
export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type VendrProfileFormValues = z.infer<typeof vendorProfileSchema>;
