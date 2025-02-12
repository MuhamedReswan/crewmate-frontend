import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React, { useRef, useState } from 'react';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { otpVerification } from "@/api/serviceBoy";
import { toast } from "@/hooks/use-toast";
import ErrorMessage from "../Message/Error.message";

interface OtpModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email?: string;
}


function OtpModal({ isModalOpen, setIsModalOpen, email }: OtpModalProps) {

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = (index: number, value: string) => {
    console.log("value", value)
    if (/^\d*$/.test(value) && value.length <= 1) {
      console.log("value1", value)

      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }

  };

  async function HandleVerifyOtp() {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 4) {
      alert(`OTP verified: ${enteredOtp}`);
      // setIsModalOpen(!isModalOpen);
      console.log("otp , email", otp, email);
      if (email && otp) {
        const otpVerifyResult = await otpVerification({ email, otp: enteredOtp });
        console.log("otpVerifyResult", otpVerifyResult);
      }
    } else {
      toast({
        description: (
          <ErrorMessage className="" message="Please Enter a valid Otp" />
        ),
        className: "tex"
      })
      alert("Please enter a valid 4-digit OTP.");
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index]) {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'Backspace' && otp[index]) {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
    }

  }

  return (

    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent className='flex-col justify-items-center p-4 max-w-xl  max-h-1/2  
      min-h-80 text-center rounded-xl m-auto'>
        <AlertDialogHeader className="flex-col items-center" >
          <AlertDialogTitle className="mt-5">Enter your 4 digit otp send to your email</AlertDialogTitle>
          <AlertDialogDescription className='flex-col'>
            <div className='w-2/3 flex p-5 justify-evenly gap-3'>
              {otp.map((digit, index) => (
                <input className='w-12 h-12 font-semibold text-3xl text-center border
                 border-gray-300 rounded-sm focus:border-gray-500 mt-5'
                 type="numeric" key={index} maxLength={1} value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  ref={(el) => (inputRefs.current[index] = el)} onKeyDown={(e) => handleKeyDown(e, index)} />
              ))}
              <input name="email" type='hidden' value={email} />
            </div>
            <p className='font-semibold text-center'>Time Left :  25 sec</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel></AlertDialogCancel>
          {/* <Button  variant={'customized'} size={'customised'}>Button</Button> */}
          <AlertDialogAction onClick={HandleVerifyOtp} className='bg-[#4B49AC] w-60 rounded-sm font-semibold p-1 mt-2 text-white' >Verify</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>


  )
}

export default OtpModal
