import {
  logOut,
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: "user" | "admin";
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  console.log(role);
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  let user;
  if (token) {
    user = verifyToken(token);
  }

  if ((user as TUser)?.role !== role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
