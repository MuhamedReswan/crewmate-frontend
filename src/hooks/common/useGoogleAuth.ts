import { googleAuth} from "@/api/serviceBoy";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import {useDispatch} from 'react-redux';
// import { useNavigate } from "react-router-dom";


const useGoogleAuth = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse: TokenResponse) => {
            try {
                const {access_token} = tokenResponse;
                const serviceBoyInfoResponse = await axios.get(
                    `https://www.googleapis.com/oauth2/v3/userinfo`,
                    {
                      headers: {
                        Authorization: `Bearer ${access_token}`,
                      },
                    }
                  );

console.log("serviceBoyInfoResponse.data",serviceBoyInfoResponse.data);

                  const { email, given_name, family_name, picture } = serviceBoyInfoResponse.data;

                  const apiResponse = await googleAuth(
                    {email, given_name, family_name, picture}
                  );

                  console.log("apiResponse",apiResponse);
                //   if (apiResponse.data.status === true) {
                //     dispatch(googleAuth(apiResponse.data.serviceData));
                //     navigate("/");
                //   }

            } catch (error) {
                console.log(error)
            }
        },

        onError: () =>{
            console.log("Error during google logi");
        }
    });

    return {googleLogin}
};

export default useGoogleAuth;