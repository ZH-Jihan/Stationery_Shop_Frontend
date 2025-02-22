import {
  logOut,
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (role !== "undefined" && (user as TUser)?.role !== role) {
    dispatch(logOut());
    navigate("/login", { replace: true });
  }
  if (!token) {
    navigate("/login", { replace: true });
  }

  return children;
};

export default ProtectedRoute;
