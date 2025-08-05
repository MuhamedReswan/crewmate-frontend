import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../Message/Error.message";
import SuccessMessage from "../Message/SuccessMessage";
import { serviceBoyForgotPassword } from "@/api/serviceBoy/serviceBoy";
import { vendorForgotPassword } from "@/api/vendor/vendor";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Role } from "@/types/enum.type";
import { ForgotPasswordFormData, ForgotPasswordModalProps } from "@/types/form.type";
import { forgotPasswordSchema } from "@/validation/validationSchema";



const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ open, setOpen, role }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      role: role
    }
  });

  const { toast } = useToast();
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      console.log("within onsubmit");
      console.log("Forgot Password Data:", data);
      let responseResult;
      if (role == Role.SERVICE_BOY) {
        responseResult = await serviceBoyForgotPassword(data);
      } else if (role == Role.VENDOR) {
        responseResult = await vendorForgotPassword(data);
      } else {
        console.error("Invalid Role");
      }
      console.log("Forgot Password Response:", responseResult);
      if (responseResult && responseResult.statusCode == 200) {

        toast({
          description: <SuccessMessage message={responseResult.message} />,
          className: "",
        });
      } else {
        toast({
          description: <ErrorMessage message={responseResult?.message}
            className="" />,
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

export default ForgotPasswordModal;