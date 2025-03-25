import { Role } from '@/types/enum.type';
import * as z from 'zod';

//Singup validation 
export const signupSchema = z.object({
  name: z.string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" })
    .trim(),
  
  email: z.string()
    .email({ message: "Invalid email address" }),
  
  mobile: z.string()
    .regex(/^[0-9]{10}$/, { message: "Mobile number must be exactly 10 digits" }),
  
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must include uppercase, lowercase, number, and special character"
    }),
  
  confirmPassword: z.string().optional(),
  
  terms: z.boolean().refine(val => val === true, { 
    message: "You must agree to the terms and conditions" 
  }).optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});



// Login validation
export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
  
  password: z.string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must include uppercase, lowercase, number, and special character"
    }),

  rememberMe: z.boolean().optional().default(false)
});

export const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
    role: z.nativeEnum(Role)
});


export const passwordSchema = z.object({
  password: z.string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must include uppercase, lowercase, number, and special character"
    }),
  confirmPassword: z.string()
    .min(1, { message: "Please confirm your password" })
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export const profileSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Full name is required"),
  qualification: z.string().min(1, "Qualification is required"),
  aadharNumber: z
    .string()
    .min(3, "Aadhar number is required")
    .regex(/^\d{12}$/, "Aadhar number must be 12 digits"),
  age: z
    .string()
    .min(1, "Age is required")
    .regex(/^[0-9]+$/, "Age must be a number")
    .refine((val) => parseInt(val) >= 18, "Age must be at least 18"),
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  location: z.string().min(3, "Location is required"),
  profileImage: z.any().refine((val) => {
    // If it's a string with length > 3, pass validation
    if (typeof val === "string" && val.length > 3) return true;
    // Otherwise, check if it's a valid File
    return val instanceof File && val !== undefined && val.size > 0;
  }, {
    message: "Profile image is required ",
  }),

  aadharImageFront: z.any().refine((val) => {
    if (typeof val === "string" && val.length > 3) return true;
    return val instanceof File && val !== undefined && val.size > 0;
  }, {
    message: "Aadhar front image is required ",
  }),

  aadharImageBack: z.any().refine((val) => {
    if (typeof val === "string" && val.length > 3) return true;
    return val instanceof File && val !== undefined && val.size > 0;
  }, {
    message: "Aadhar back image is required ",
  }),
  email:z.string().email("Invalid email address")
});

