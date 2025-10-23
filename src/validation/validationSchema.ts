import * as z from "zod";
import { Role } from "@/types/enum.type";
const nameRegex = /^[A-Za-z ]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const mobileRegex = /^[0-9]{10}$/;

//Singup validation
export const signupSchema = z
  .object({
    name: z.string()
  .trim() 
  .min(3, 'Full name is required')
  .max(20, 'Name cannot exceed 20 characters')
  .regex(nameRegex, 'Name can only contain alphabets and spaces')
  .refine(
    (value) => (value.match(/ /g) || []).length <= 2,
    'Name cannot contain more than 2 spaces'
  ),
      
    email: z.string().email({ message: "Invalid email address" }),

    mobile: z
      .string()
      .regex(mobileRegex, {
        message: "Mobile number must be exactly 10 digits",
      }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        passwordRegex,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }
      ),

    confirmPassword: z.string().optional(),

    terms: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Login validation
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      passwordRegex,
      {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }
    ),

  rememberMe: z.boolean().optional().default(false),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
  role: z.nativeEnum(Role),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        passwordRegex,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  //service boy profile validation
export const profileSchema = z.object({
  _id: z.string().optional(),
  name:z.string()
  .trim() 
  .min(3, 'Full name is required')
  .max(20, 'Name cannot exceed 20 characters')
  .regex(nameRegex, 'Name can only contain alphabets and spaces')
  .refine(
    (value) => (value.match(/ /g) || []).length <= 2,
    'Name cannot contain more than 2 spaces'
  ),
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
    .regex(mobileRegex, "Mobile number must be 10 digits"),
  profileImage: z.any().refine(
    (val) => {
      // If it's a string with length > 3, pass validation
      if (typeof val === "string" && val.length > 3) return true;
      // Otherwise, check if it's a valid File
      return val instanceof File && val !== undefined && val.size > 0;
    },
    {
      message: "Profile image is required ",
    }
  ),

  aadharImageFront: z.any().refine(
    (val) => {
      if (typeof val === "string" && val.length > 3) return true;
      return val instanceof File && val !== undefined && val.size > 0;
    },
    {
      message: "Aadhar front image is required ",
    }
  ),

  aadharImageBack: z.any().refine(
    (val) => {
      if (typeof val === "string" && val.length > 3) return true;
      return val instanceof File && val !== undefined && val.size > 0;
    },
    {
      message: "Aadhar back image is required ",
    }
  ),


  location: z.any().refine(
    (val) => {
      if (typeof val === "string" && val.length > 3) return true;
      return (
        val instanceof Object &&
        val.lat !== undefined &&
        val.lng !== undefined &&
        typeof val.lat === "number" &&
        typeof val.lng === "number"
      );
    },
    {
      message: "Location is required",
    }
  ),

  email: z.string().email("Invalid email address"),
});


// vendor proifile validation
export const vendorProfileSchema = z.object({
  _id: z.string().optional(),

  name: z.string()
  .trim() 
  .min(3, 'Full name is required')
  .max(20, 'Name cannot exceed 20 characters')
  .regex(nameRegex, 'Name can only contain alphabets and spaces')
  .refine(
    (value) => (value.match(/ /g) || []).length <= 2,
    'Name cannot contain more than 2 spaces'
  ),

  licenceImage: z.any().refine(
    (val) => {
      if (typeof val === "string" && val.length > 3) return true;
      return val instanceof File && val !== undefined && val.size > 0;
    },
    {
      message: "Licence image is required",
    }
  ),

  profileImage: z
    .any()
    .refine(
      (val) => {
        // if (val === undefined) return true; // Optional field
        if (typeof val === "string" && val.length > 3) return true;
        return val instanceof File && val !== undefined && val.size > 0;
      },
      {
        message: "Invalid profile image",
      }
    ),

  licenceNumber: z
    .string()
    .min(1, "Licence number is required")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Licence number must contain only letters and numbers"
    )
    .length(21, "valid Licence number must be exactly 21 characters"),

  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(mobileRegex, "Mobile number must be 10 digits"),

    location: z.any().refine(
      (val) => {
        if (typeof val === "string" && val.length > 3) return true;
        return (
          val instanceof Object &&
          val.lat !== undefined &&
          val.lng !== undefined &&
          typeof val.lat === "number" &&
          typeof val.lng === "number"
        );
      },
      {
        message: "Location is required",
      }
    ),
    
  instaId: z
  .string()
  .min(1, "Instagram ID is required")
  .max(30, "Instagram ID must be at most 30 characters")
  .regex(/^(?!.*\.\.)(?!.*\.$)[A-Za-z0-9._]+$/, "Invalid Instagram ID format"),

  estd: z
    .string()
    .min(1, "Establishment year is required")
    .regex(/^[0-9]{4}$/, "Establishment year must be a 4-digit year")
    .refine(
      (val) => parseInt(val) <= new Date().getFullYear(),
      "Year cannot be in the future"
    ),

  email: z.string().email("Invalid email address"),
});

// Event creation validation

export const eventSchema = z.object({
  customerName: z.string()
  .trim() 
  .min(3, 'Customer name must have at least 2 characters')
  .max(20, 'Customer name cannot exceed 20 characters')
  .regex(nameRegex, 'Customer name can only contain alphabets and spaces')
  .refine(
    (value) => (value.match(/ /g) || []).length <= 2,
    'Customer name cannot contain more than 2 spaces'
  ),  
  typeOfService: z.string().min(1, 'Type of service is required'),
  typeOfWork: z.string().min(1, 'Type of work is required'),
  noOfPax: z.coerce.number().min(10, "Number of pax must be at least 10"),
  reportingTime: z.string().min(1, 'Reporting time is required'),
  serviceBoys: z.coerce.number().min(1, 'Number of boys must be at least 1'),
  eventLocation: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string().min(1, 'Address is required'),
  }).nullable().refine(val => val !== null, 'Location is required'),
 date: z
    .string()
    .min(1, 'Date is required')
    .refine((val) => {
      const selectedDate = new Date(val);
      const today = new Date();

      // Reset time part for "today" comparison
      today.setHours(0, 0, 0, 0);

      return selectedDate >= today;
    }, {
      message: "Date cannot be in the past",
    }),})
 .superRefine((data, ctx) => {
    if (data.noOfPax > 1000 && data.serviceBoys > Math.ceil(data.noOfPax * 0.07)) {
      ctx.addIssue({
        path: ["serviceBoys"],
        message: "For events over 1000 pax, service boys cannot exceed 7% of the pax count",
        code: "custom",
      });
    }

    if (data.noOfPax <= 1000 && data.serviceBoys > 100) {
      ctx.addIssue({
        path: ["serviceBoys"],
        message: "For events below 1000 pax, a maximum of 100 service boys is allowed",
        code: "custom",
      });
    }
  });
