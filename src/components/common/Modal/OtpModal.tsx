import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../Message/Error.message";
import SuccessMessage from "../Message/SuccessMessage";
import { serviceBoyOtpVerification, serviceBoyResendOtp } from "@/api/serviceBoy";
import { vendorOtpVerification, vendorResendOtp } from "@/api/vendor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast"
import { login } from "@/redux/slice/serviceBoyAuth.slice";
import { vendorLogin } from "@/redux/slice/vendorAuth.slice";
import { Messages, Role } from "@/types/enum.type";
import { getApiErrorMessage } from "@/utils/apiErrorHanldler";

interface OtpModalProps {
  isModalOpen: boolean;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  email?: string;
  role: Role;
}

function OtpModal({ isModalOpen, setIsModalOpen, email, role }: OtpModalProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch()

  console.log("email form otp modal", email);

  useEffect(() => {
    if (!isModalOpen) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isModalOpen]);


  const handleInputChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

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


  const HandleVerifyOtp = async () => {
    try {
      const enteredOtp = otp.join("");

      if (enteredOtp.length !== 4) {
        toast({
          description: <ErrorMessage message={Messages.ENTER_VALID_OTP} />,
          className: "error",
        });
        return;
      }

      if (!email) return;

      let otpVerifyResult;

      if (role === Role.VENDOR) {
        otpVerifyResult = await vendorOtpVerification({ email, otp: enteredOtp });
      } else {
        otpVerifyResult = await serviceBoyOtpVerification({ email, otp: enteredOtp });
      }

      if (otpVerifyResult) {
        toast({
          description: <SuccessMessage message={otpVerifyResult.message} />,
        });

        if (role === Role.VENDOR) {
          dispatch(vendorLogin(otpVerifyResult.data));
          setTimeout(() => navigate("/vendor/"), 1000);
        } else {
          dispatch(login(otpVerifyResult.data));
          setTimeout(() => navigate("/service-boy/"), 1000);
        }

        if (setIsModalOpen) setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        description: <ErrorMessage message={getApiErrorMessage(error)} />,
        className: "error",
      });
    }
  };


  const handleResendOtp = async () => {
    try {
      if (email) {
        let otpResendResult;
        if (role === Role.VENDOR) {
          otpResendResult = await vendorResendOtp({ email });

        } else {
          otpResendResult = await serviceBoyResendOtp({ email });
        }
        if (otpResendResult) {
          toast({
            description: <SuccessMessage message={otpResendResult?.message} />
          });
          setTimer(60);
        }
      }
    } catch (error) {
      toast({
        description: <ErrorMessage message={getApiErrorMessage(error, Messages.RESEND_OTP_FAILED)} />,
        className: "error",
      })

    }
  }

  return (
    <AlertDialog open={isModalOpen} >
      <AlertDialogContent className="flex-col justify-items-center p-4 max-w-xl  max-h-1/2  
        min-h-80 text-center rounded-xl m-aut">
        <AlertDialogHeader className="flex-col items-center">
          <AlertDialogTitle>Enter your 4-digit OTP sent to your email</AlertDialogTitle>
          <AlertDialogDescription>
            <div className=" w-2/3 flex p-5 justify-evenly gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  className="w-12 h-12 font-semibold text-3xl text-center border border-gray-300 rounded-sm focus:border-gray-500 mt-5"
                  type="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
              <input name="email" type='hidden' value={email} />

            </div>
            <p className="font-semibold text-center">Time Left: {timer} sec</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel></AlertDialogCancel>
          <div className="flex flex-col items-center gap-2">
            <AlertDialogAction onClick={() => HandleVerifyOtp()} className="bg-[#4B49AC] w-60 rounded-sm text-white hover:bg-[#3f3d91]">
              Verify
            </AlertDialogAction>
            {timer === 0 && <p className="text-sm">Didn&apos;t recieve code? <button className="text-[#4B49AC]" onClick={handleResendOtp}> Resend </button></p>}
            {timer !== 0 && <p className="text-sm">Didn&apos;t recieve code? <button className="text-[#4B49AC]" > Resend in {timer} sec</button></p>}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default OtpModal;
