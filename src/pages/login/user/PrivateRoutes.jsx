import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { account } from "../../../appwrite/config";
import { useEffect } from "react";
export const loader = async () => {
  try {
    const userData = await account.get(); //admin
    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
import { useUserL } from "../zustantd";
export const PrivateRoutes = () => {
  const navigate = useNavigate();

  const userData = useUserL((s) => s.user);

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
    }
  }, [userData, navigate]);

  return userData ? <Outlet /> : <Navigate to="/login" replace />;
};
