import { TokenResponse, useGoogleLogin } from "@react-oauth/google";

import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { googleAuth } from "@/api/serviceBoy";
import { vendorGoogleAuth } from "@/api/vendor";
import ErrorMessage from "@/components/common/Message/Error.message";
import SuccessMessage from "@/components/common/Message/SuccessMessage";
import { login } from "@/redux/slice/serviceBoyAuth.slice";
import { vendorLogin } from "@/redux/slice/vendorAuth.slice";
import { Role } from "@/types/enum.type";


const useGoogleAuth = (role: Role) => {
  console.log("role", role)
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("useGoogleAuth invoked");
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {


      console.log("token response google auth", tokenResponse);
      const { access_token } = tokenResponse;
      let googleAuthResponse;
      if (role === Role.SERVICE_BOY) {
        googleAuthResponse = await googleAuth({ googleToken: access_token });
      } else if (role === Role.VENDOR) {
        googleAuthResponse = await vendorGoogleAuth({ googleToken: access_token });
      }
      console.log("googleAuthResponse from hoook", googleAuthResponse)
      if (googleAuthResponse && googleAuthResponse.statusCode === 200) {
        toast({
          description: <SuccessMessage message={googleAuthResponse?.message} />,
        })

        if (role === Role.SERVICE_BOY) {
          dispatch(login(googleAuthResponse.data))
          navigate('/service-boy/');
        } else if(role === Role.VENDOR) {
          dispatch(vendorLogin(googleAuthResponse.data))
          navigate('/vendor/');
        }else{
          console.log("google log role not proper")
        }

      } else {
        toast({
          description: (
            <ErrorMessage
              className="" message={googleAuthResponse?.message || "Bad"} />
          )
        })
      }

    },

    onError: (error) => {
      console.log("Error during google logi", error);
      toast({
        description: (
          <ErrorMessage
            className=""
            message={error?.error || "Failed to login with Google. Please try again."}
          />
        )
      });
    }
  });

  return { googleLogin }
};

export default useGoogleAuth;