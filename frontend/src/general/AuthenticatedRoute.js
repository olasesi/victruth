import React, { useEffect } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const AuthenticatedRoute = ({ userType, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticatedAdmin = Cookies.get("auth_token_admin");
    const isAuthenticatedVendor = Cookies.get("auth_token_vendor");
    const isAuthenticatedCustomer = Cookies.get("auth_token_customer");

    // Additional authentication checks based on user type
    if (
      (userType === "admin" && !isAuthenticatedAdmin) ||
      (userType === "vendor" && !isAuthenticatedVendor) ||
      (userType === "customer" && !isAuthenticatedCustomer)
    ) {
      navigate("/");
    }
  }, [userType]);

  return <Outlet>{children}</Outlet>;
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node,
  userType: PropTypes.string.isRequired,
};

export default AuthenticatedRoute;
