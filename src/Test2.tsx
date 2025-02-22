//based on figma 

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './components/ui/button';

// Password validation schema
const passwordSchema = z.object({
  password: z.string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must include uppercase, lowercase, number, and special character"
    }),
  confirmPassword: z.string()
    .min(1, { message: "Please confirm your password" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ForgotPasswordModal = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset successful', data);
    // Here you would handle the API call to reset the password
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-2/3 min-w-96 max-w-lg">
        <h2 className="text-xl font-medium text-center mb-6 ">Create New Password</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 relative">
            <label className="block text-sm text-gray-600 mb-1">New password</label>
            <Input
              type={showPassword ? 'password' : 'text'}
              {...register('password')}
              className={`w-full p-2 bg-gray-100 rounded-md`}
              placeholder="Your new password"
            />
            <span className='absolute top-8 right-2' onClick={()=>setShowPassword(!showPassword)}> {showPassword ? <EyeOff size={16} className='text-gray-500' /> :
             <Eye size={16} className='text-gray-500' />}</span>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
            
          </div>
          
          <div className="mb-6 relative">
            <label className="block text-sm text-gray-600 mb-1">Confirm new password</label>
            <Input
              type={showConfirmPassword ? 'password' : 'text'}
              {...register('confirmPassword')}
              className={`w-full p-2 bg-gray-100 rounded-md `}
              placeholder="Confirm your new password"
            />
            <span className='absolute top-8 right-2' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword ? <EyeOff size={16} className='text-gray-500'  /> :
             <Eye size={16} className='text-gray-500' />}</span>
            
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <div className="flex justify-center space-x-9">
            <button 
              type="button"
              className="px-6 py-2 bg-[#4B49AC] opacity-20  text-white rounded hover:bg-[#3f3d91] opacity-40 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#4B49AC] text-white rounded hover:bg-[#3f3d91]transition-colors disabled:opacity-70 text-white"
            >
              {isSubmitting ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;











// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Eye, EyeOff } from 'lucide-react';
// import { Label } from '@/components/ui/label';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { passwordSchema } from './validation/validationSchema';
// import { PasswordFormValues } from './types/form.type';

// passwordSchema.refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });


// const Test2 = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const form = useForm<PasswordFormValues>({
//     resolver: zodResolver(passwordSchema),
//     defaultValues: {
//       password: '',
//       confirmPassword: '',
//     },
//   });

//   const onSubmit = async (values: PasswordFormValues) => {
//     try {
//       console.log('Password reset with:', values);
//       setSuccess(true);
//     } catch (error) {
//       form.setError('root', {
//         message: 'Failed to reset password. Please try again.',
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <Card className="border-0 shadow-none w-full max-w-sm">
//         <CardHeader className="pb-3">
//           <CardTitle className="text-lg font-bold text-center mb-3">Reset Password</CardTitle>
//           <CardDescription className="text-center">Please create a new password for your account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <Label htmlFor="password">New Password</Label>
//                     <div className="relative">
//                       <FormControl>
//                         <Input
//                           type={showPassword ? 'text' : 'password'}
//                           {...field}
//                           className="p-1.5 h-8 pr-10"
//                         />
//                       </FormControl>
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-2 top-1/2 -translate-y-1/2"
//                       >
//                         {showPassword ? <EyeOff size={16} className='text-gray-500' /> : <Eye size={16} className='text-gray-500' />}
//                       </button>
//                     </div>
//                     <FormMessage className="text-xs font-normal" />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1">
//                     <Label htmlFor="confirmPassword">Confirm Password</Label>
//                     <div className="relative">
//                       <FormControl>
//                         <Input
//                           type={showConfirmPassword ? 'text' : 'password'}
//                           {...field}
//                           className="p-1.5 h-8 pr-10"
//                         />
//                       </FormControl>
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute right-2 top-1/2 -translate-y-1/2"
//                       >
//                         {showConfirmPassword ? <EyeOff size={16} className='text-gray-500' /> : <Eye size={16} className='text-gray-500'/>}
//                       </button>
//                     </div>
//                     <FormMessage className="text-xs font-normal" />
//                   </FormItem>
//                 )}
//               />

//               {form.formState.errors.root && (
//                 <Alert variant="destructive">
//                   <AlertDescription >{form.formState.errors.root.message}</AlertDescription>
//                 </Alert>
//               )}

//               {success && (
//                 <Alert className="bg-green-50 text-green-700">
//                   <AlertDescription>Password successfully reset!</AlertDescription>
//                 </Alert>
//               )}

//               <Button 
//                 type="submit" 
//                 className="w-full bg-[#4B49AC] hover:bg-[#3f3d91] h-8"
//                 disabled={form.formState.isSubmitting}
//               >
//                 {form.formState.isSubmitting ? 'Resetting...' : 'Reset Password'}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Test2;