import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { forgotPasswordSchema } from "./validation/validationSchema";
import { ForgotPasswordFormData } from "./types/form.type";
import ErrorMessage from "./components/common/Message/Error.message";
import { Role } from "./types/enum.type";
import { serviceBoyForgotPassword } from "./api/serviceBoy";
import SuccessMessage from "./components/common/Message/SuccessMessage";
import { vendorForgotPassword } from "./api/vendor";



function Test({role = Role.VENDOR}: {role:Role}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      role: role 
  }});

  const { toast } = useToast();
  const [open, setOpen] = useState(false); 

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {console.log("within onsubmit");
      console.log("Forgot Password Data:", data);
      let responseResult;
      if(role == Role.SERVICE_BOY){
        responseResult = await serviceBoyForgotPassword(data);
      }else if(role == Role.VENDOR){
        responseResult = await vendorForgotPassword(data);
      }else{
        console.error("Invalid Role");
      }
      console.log("Forgot Password Response:", responseResult);
if(responseResult && responseResult.statusCode == 200){
  
  toast({
    description: <SuccessMessage message={responseResult.message} />,
    className: "",
  });
}else{
toast({
  description: <ErrorMessage message={responseResult?.message} 
  className=""/>,
})
}
     setOpen(false); // Close modal after success
      reset(); // Reset form
    } catch (error) {
      console.error(error);
      toast({
        description: <ErrorMessage message={error.response.data.message} className="" />,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Forgot Password?</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Forgot Password?</DialogTitle>
          <DialogDescription>
            Enter your email address, and we’ll send you a link to email for reset your password.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-[#4B49AC] hover:bg-[#3f3d91]">
              Submit
            </Button>
          </DialogFooter>
        </form>
        <DialogClose className="absolute top-0 right-0">
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default Test;






// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   // AlertDialogDescription,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { forgotPasswordSchema } from "./validation/validationSchema";
// import { ForgotPasswordFormData } from "./types/form.type";
// import { Role } from "./types/enum.type";
// import { serviceBoyForgotPassword } from "./api/serviceBoy";
// import { useToast } from "./hooks/use-toast";
// import SuccessMessage from "./components/common/Message/SuccessMessage";
// import ErrorMessage from "./components/common/Message/Error.message";
// import { Input } from "./components/ui/input";
// import { X } from 'lucide-react';



// function Test({ role }: { role: Role }) {

//   const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
//     resolver: zodResolver(forgotPasswordSchema),
//     defaultValues: {
//       role: role|| Role.SERVICE_BOY ,
//       email:""

//     }
//   });

//   const { toast } = useToast();

//   const onSubmit = async (data: ForgotPasswordFormData) => {
//     console.log("within onsubmit");
//     try {
//       console.log("forgotPassword", data);
//       let result;
//       if (role == Role.SERVICE_BOY) {
//         result = await serviceBoyForgotPassword(data);
//       } else {
//         // result = await vendorForgotPassword(data);
//       }
//       if (result && result.statusCode == 200) {
//         console.log(" forgot resut success");
//         toast({
//           description: <SuccessMessage message={result.message} />,
//           className: ""
//         })
//       } else {
//         console.log(" forgot resut failed");
//         toast({
//           description: <ErrorMessage message={result?.message} />,
//           className: ""
//         })
//       }

//     } catch (error) {
//       console.log(error);
//       throw error;

//     }
//   }

//   return (
//     <AlertDialog >
//       <AlertDialogTrigger asChild>
//         <Button variant="outline">Show Dialog</Button>
//       </AlertDialogTrigger>
//       <form onSubmit={handleSubmit(onSubmit)}>
//       <AlertDialogContent className="min-h-48 position-relative">
//         <AlertDialogHeader>
//           <AlertDialogTitle>Enter your email  for  password</AlertDialogTitle>
//           {/* <AlertDialogDescription > */}
//             <div className="flex flex-col gap-4 justify-center items-center position-relative">
              
//          <Input  type="email" placeholder="Enter your email" {...register("email")}/>
//          {errors.email && (
//                     <p className="text-xs text-red-500">{errors.email.message}</p>
//                   )}  
//             <Button className="w-1/2 bg-[#4B49AC] hover:bg-[#3f3d91]" type="submit">Submit</Button>
//             </div>
//              {/* </AlertDialogDescription> */}
//         </AlertDialogHeader>
//           <AlertDialogCancel className="border-none positon absolute top-0 right-0"> <X /></AlertDialogCancel>
//         {/* <AlertDialogFooter className="flex-row items-center justify-around">
//           <AlertDialogAction>Continue</AlertDialogAction>
//         </AlertDialogFooter> */}
//       </AlertDialogContent>
//       </form>

//     </AlertDialog>
//   )
// }

// export default Test