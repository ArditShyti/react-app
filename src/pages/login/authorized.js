import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "./helpers";

const AuthorizedRoute = ({ children, roles }) => {
  const token = getCookie("access_token");
  let location = useLocation();
 console.log(token);
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }else{
  return children;
  }
};

export default AuthorizedRoute;