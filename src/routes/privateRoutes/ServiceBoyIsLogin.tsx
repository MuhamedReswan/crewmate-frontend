import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";

interface ProtectServiceBoyIsLoginProps {
  children: ReactNode;
}

const ProtectServiceBoyIsLogin: React.FC<ProtectServiceBoyIsLoginProps> = ({
  children,
}) => {
  const serviceBoyIsLoggedIn = useSelector(
    (state: RootState) => state.serviceBoy.serviceBoyStatus
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (serviceBoyIsLoggedIn) {
      navigate("/service-boy/");
    }
  }, [serviceBoyIsLoggedIn, navigate]);

  if (!serviceBoyIsLoggedIn) {
    return <>{children}</>;
  }


  return null;
};

export default ProtectServiceBoyIsLogin;
