// old signup
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/validation/validationSchema';
import crewmateLogo from "../../../assets/images/CrewMate_logo.png"
import serviceBoyLogin from "../../../assets/images/catering_login_image.jpg";
import { SignupFormData } from "@/types/form.type";
import { useState } from "react";
import OtpModal from "@/components/common/Modal/OtpModal";
import { useToast } from "@/hooks/use-toast"
import SuccessMessage from "@/components/common/Message/SuccessMessage";
import ErrorMessage from "@/components/common/Message/Error.message";
import { Role } from "@/types/enum.type";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { vendorRegister } from "@/api/vendor";
import useGoogleAuth from "@/hooks/useGoogleAuth";
import { getApiErrorMessage } from "@/utils/apiErrorHanldler";
import { Eye, EyeOff } from "lucide-react";




const VendorSignUpPage = () => {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      terms: false,
    }
  });
  const { toast } = useToast();
  const {googleLogin} = useGoogleAuth(Role.VENDOR)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();


  const onSubmit = async (data: SignupFormData) => {
 
try{
  console.log("form submitted");
    setLoading(true);
    setEmail(data.email);
    console.log("onsubmit", data);
    console.log("email from sign up after set", email);
    const registerResponse = await vendorRegister(data);
    console.log("registerResponse on service boy fronty", registerResponse);
    if (registerResponse && registerResponse.statusCode === 201) {
      toast({
        description: (
          <SuccessMessage
            className="" message={registerResponse?.message} />
        )
      })
    } else {
      toast({
        description: (
          <ErrorMessage
            className="" message={registerResponse?.message || "Bad"} />
        )
      })
    }
    

    function HandleModal() {
      setIsModalOpen(!isModalOpen)
    }

    if (registerResponse) {
      console.log("response got on form submit", isModalOpen)
      setEmail(registerResponse.data.email);
      HandleModal();
    }
    console.log("registerResponse", registerResponse)

  
}catch(error:unknown){
 const message = getApiErrorMessage(error, "Registration failed. Please try again.");
  toast({
    description: <ErrorMessage message={message} />,
  });
  } finally {
    setLoading(false);
  } 
  };


  const formValues = watch();
  console.log("formValues", formValues)

  return (
    <div className="h-screen flex overflow-hidden  relative">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col h-full p-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-2 z-50 ">
          <svg
            width="32"
            height="32"
            viewBox="0 0 400 400"
            className="text-[#4B49AC]"
          />
          <img src={crewmateLogo} alt="logo" className="w-[45px] h-[45px]" />
          <span className="text-xl font-bold text-[#4B49AC]">Crewmate</span>
        </div>

        {/* Form Card */}
        <div className="flex items-center justify-center flex-1">
          <Card className="border-0 shadow-none w-full max-w-sm">
            <CardHeader className="pb-2  flex  items-center pt-1">
              <CardTitle className="text-lg font-bold text-center ">Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">

                <div className="space-y-1">
                  <Tabs defaultValue={Role.VENDOR}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value={Role.SERVICE_BOY} onClick={() => navigate('/service-boy/register')}>Service boy</TabsTrigger>
                      <TabsTrigger
                        value={Role.VENDOR} className="data-[state=active]:bg-[#4B49AC] data-[state=active]:text-white">Vendor</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>


                <div className="space-y-1">
                  <Label htmlFor="name">Comany Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="p-1.5 h-8"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="p-1.5 h-8"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 ">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    placeholder="Enter your mobile number"
                    className="p-1.5 h-8"
                    {...register('mobile')}
                  />
                  {errors.mobile && (
                    <p className="text-xs text-red-500">{errors.mobile.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    className="p-1.5 h-8"
                    {...register('password')}
                  />
                   <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                     tabIndex={-1}
                  >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                 </button>
                 </div>
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm password"
                    className="p-1.5 h-8"
                    {...register('confirmPassword')}
                  />
                   <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirm(!showConfirm)}
                     tabIndex={-1}
                  >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                 </button>
                 </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <Checkbox
                    id="terms"
                    checked={watch("terms")} //  Watch state for real-time updates
                    onCheckedChange={(checked) => setValue("terms", checked as boolean)}

                  />
                  <Label htmlFor="terms" className="text-xs">
                    I agree to the terms & policy
                  </Label>
                  {errors.terms && (
                    <p className="text-xs text-red-500">{errors.terms.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-[#4B49AC] hover:bg-[#3f3d91] h-8">
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>

                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-8"
                  onClick={() => {
                    console.log("google login clicked");
                    googleLogin();
                  }}
                >
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </Button>

                <div className="text-center text-xs text-gray-500">
                  Already have an account?{' '}
                  <Link to="/vendor/login" className="text-[#4B49AC] hover:text-[#3f3d91]">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block w-1/2 h-screen">
        <div className="w-full h-full relative">
          <img
            src={serviceBoyLogin}
            alt="Service Boy Login"
            className="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl"
          />
        </div>
      </div>
      {isModalOpen && <OtpModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} email={email} role={Role.VENDOR} />}


    </div>
  );
};

export default VendorSignUpPage;