import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// react-router components
import { Routes, Route, useLocation } from "react-router-dom";
//
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";
import routes2 from "routes2";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

// Auth
//
import Dashboard from "layouts/dashboard";
import Appearance from "layouts/appearance";
import SocialMedia from "layouts/social";
import Vendors from "layouts/vendors";
import Vendor from "layouts/vendor";
import Settings from "layouts/settings";
import Orders from "layouts/orders";
import Customers from "layouts/customers";
import Profile from "layouts/profile";
import Errorpage from "views/examples/Errorpage";
import AboutUs from "views/examples/AboutUs";
import Services from "views/examples/Services";
import ContactUs from "views/examples/ContactUs";
import LandingPage from "views/examples/LandingPage.js";
import HomePage from "views/examples/HomePage";
import VerifyPayment from "views/examples/VerifyPayment";
import Register from "views/examples/Register";
import VendorLoginPage from "views/examples/VendorLoginPage.js";
import VendorVerifyEmail from "views/examples/VendorVerifyEmail";
import PasswordResetForm from "views/examples/PasswordResetForm";
import PasswordResetFormAdmin from "views/examples/PasswordResetFormAdmin";
import CustomerPasswordResetForm from "views/examples/CustomerPasswordResetForm";
import CustomerPasswordChange from "views/examples/CustomerPasswordChange";
import PasswordChange from "views/examples/PasswordChange";
import PasswordChangeAdmin from "views/examples/PasswordChangeAdmin";
import VendorRegister from "views/examples/VendorRegister";
import Login from "views/examples/Login";
import AdminLoginPage from "views/examples/AdminLoginPage";

//
import AuthenticatedRoute from "general/AuthenticatedRoute";
import AuthenticatedPreventedRoute from "general/AuthenticatedPreventedRoute";
//
import Cookies from "js-cookie";

export default function App() {
  const [websiteSetting, setWebsiteSetting] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-website-settings")
        .then(function (response) {
          if (response.data.status === 200) {
            setWebsiteSetting(response.data);
            setLoading(true);
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  }, []);
  const location = useLocation();

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />

      {Cookies.get("auth_token_admin")
        ? layout === "dashboard" &&
          (pathname === "/dashboard" ||
            pathname === "/dashboard/setting" ||
            pathname === "/dashboard/social-media" ||
            pathname === "/dashboard/appearance" ||
            pathname === "/dashboard/vendors" ||
            pathname === "/dashboard/orders" ||
            pathname.match(/^\/dashboard\/vendor\/\d+$/) ||
            pathname === "/dashboard/customers") && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName={loading && websiteSetting.website_setting[0].value}
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )
        : Cookies.get("auth_token_vendor") &&
          layout === "dashboard" &&
          pathname === "/dashboard/profile" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName={loading && websiteSetting.website_setting[0].value}
                routes={routes2}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}

      {layout === "vr" && <Configurator />}
      <Routes>
        <Route element={<AuthenticatedRoute userType="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} key="dashboard" />
          <Route path="/dashboard/appearance" element={<Appearance />} key="appearance" />
          <Route path="/dashboard/social-media" element={<SocialMedia />} key="social" />
          <Route path="/dashboard/setting" element={<Settings />} key="setting" />
          <Route path="/dashboard/vendors" element={<Vendors />} key="vendors" />
          <Route path="/dashboard/orders" element={<Orders />} key="orders" />
          <Route path="/dashboard/vendor/:id" element={<Vendor />} key="vendor" />
          <Route path="/dashboard/customers" element={<Customers />} key="customers" />
        </Route>
        <Route element={<AuthenticatedRoute userType="vendor" />}>
          <Route path="/dashboard/profile" element={<Profile />} key="profile" />
        </Route>

        <Route element={<AuthenticatedRoute userType="customer" />}>
          <Route path="/user-dashboard" element={<HomePage />} key="customer" />
          <Route path="/verify-payment" element={<VerifyPayment />} />
        </Route>

        <Route element={<AuthenticatedPreventedRoute />}>
          <Route path="/vendor-login" element={<VendorLoginPage />} />
          <Route path="/vendor-verify-email/:id" element={<VendorVerifyEmail />} />
          <Route path="/password-reset-form" element={<PasswordResetForm />} />
          <Route path="/password-reset-form-admin" element={<PasswordResetFormAdmin />} />
          <Route path="/customer-password-reset-form" element={<CustomerPasswordResetForm />} />
          <Route path="/customer-enter-new-password/:id" element={<CustomerPasswordChange />} />
          <Route path="/enter-new-password/:id" element={<PasswordChange />} />
          <Route path="/enter-new-password-admin/:id" element={<PasswordChangeAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vendor-register" element={<VendorRegister />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/*" element={<Errorpage />} />
      </Routes>
    </ThemeProvider>
  );
}
