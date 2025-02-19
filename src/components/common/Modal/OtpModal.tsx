import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useRef, useState } from "react";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { serviceBoyOtpVerification, serviceBoyResendOtp } from "@/api/serviceBoy";
import { useToast } from "@/hooks/use-toast"
import ErrorMessage from "../Message/Error.message";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "../Message/SuccessMessage";
import { Messages, Role } from "@/types/enum.type";
import { vendorOtpVerification, vendorResendOtp } from "@/api/vendor";

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

  console.log("email form otp modal",email);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isModalOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isModalOpen, timer]);

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
      console.log("email from handle verify otp", email);

      const enteredOtp = otp.join("");
      if (enteredOtp.length === 4) {
        console.log("email from handle verify otp", email);
        if (email && otp) {
          let otpVerifyResult;
          if (role === Role.VENDOR) {
            otpVerifyResult = await vendorOtpVerification({ email, otp: enteredOtp });
            console.log("otpVerifyResult vendoer",otpVerifyResult);
          } else {
            otpVerifyResult = await serviceBoyOtpVerification({ email, otp: enteredOtp });
            console.log("otpVerifyResult serviceBoy", otpVerifyResult);

          }

          if (otpVerifyResult) {
            toast({
              description: <SuccessMessage
                message={otpVerifyResult?.message} />
            });

            // Redirect based on role
            if (role === Role.VENDOR) {

              setTimeout(() => {
                navigate("/vendor/");
              }, 1000);

            } else {

              toast({
                description: <SuccessMessage
                  className="" message={otpVerifyResult?.message} />
              });

              setTimeout(() => {
                navigate("/service-boy/");
              }, 1000);

            }
            if (setIsModalOpen) setIsModalOpen(false);

          }
        }
      } else {
        toast({
          description: <ErrorMessage message={Messages.ENTER_VALID_OTP} />,
          className: "error",
        });
      }
    } catch (error) {
      toast({
        description: <ErrorMessage message={error.response.data.message} />,
        className: "error",
      });
    }

  }

  const handleResendOtp = async () => {
    try {
      alert("button resend clicked")
      if (email) {
        let otpResendResult;
        if (role === Role.VENDOR) {
          otpResendResult = await vendorResendOtp({ email });
          console.log("otpResendResult vendor", otpResendResult);

        } else {
          otpResendResult = await serviceBoyResendOtp({ email });
          console.log("otpResendResult serviceBoy", otpResendResult);
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
        description: <ErrorMessage message={error.response.data.message} />,
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
          <div className="flex flex-col items-center gap-3">
            <AlertDialogAction onClick={() => HandleVerifyOtp()} className="bg-[#4B49AC] w-60 rounded-sm text-white">
              Verify
            </AlertDialogAction>
            <p className="text-sm">Didn't recieve code? <button className="text-[#4B49AC]" onClick={handleResendOtp}> Resend </button></p>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default OtpModal;
