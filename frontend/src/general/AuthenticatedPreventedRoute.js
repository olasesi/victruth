import React, { useEffect } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const AuthenticatedPreventedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticatedAdmin = Cookies.get("auth_token_admin");
    const isAuthenticatedVendor = Cookies.get("auth_token_vendor");
    const isAuthenticatedCustomer = Cookies.get("auth_token_customer");

    // Additional authentication checks based on user type
    if (isAuthenticatedAdmin) {
      navigate("/dashboard");
    } else if (isAuthenticatedVendor) {
      navigate("/dashboard/profile");
    } else if (isAuthenticatedCustomer) {
      navigate("/user-dashboard");
    }
  }, []);

  return <Outlet />;
};

AuthenticatedPreventedRoute.propTypes = {
  children: PropTypes.node,
};

export default AuthenticatedPreventedRoute;
