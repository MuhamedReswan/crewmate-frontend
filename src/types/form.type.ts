import { signupSchema } from "@/validation/validationSchema";
import { z } from "zod";

// Type for form validation
export type SignupFormData = z.infer<typeof signupSchema>;