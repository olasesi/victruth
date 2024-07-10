// react-router components
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

//
import Cookies from "js-cookie";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
//
import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";

//
import Loader from "loader/loader";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleOpenAccount = (event) => setOpenAccount(event.currentTarget);
  const handleCloseAccount = () => setOpenAccount(false);

  // Render Account
  const renderAccount = () => (
    <Menu
      anchorEl={openAccount}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openAccount)}
      onClose={handleCloseAccount}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        disabled={loading}
        onClick={logoutSubmit}
        icon={<Icon>logout</Icon>}
        title="Logout"
      />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });
  const [loading, setLoading] = useState(false);

  const logoutSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (Cookies.get("auth_token_admin")) {
      try {
        await axios.get("/api/v1/sanctum/csrf-cookie");
        const response = await axios.post("/api/logout-admin");

        if (response.data.status === 200) {
          setLoading(false); // Reset loading state

          Cookies.remove("auth_token_admin");

          Swal.fire({
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });

          window.location.href = "/admin-login";
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setLoading(false); // Reset loading state

          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            showConfirmButton: false,
            timer: 1500,
          });

          // Redirect to the homepage when status is 401
          window.location.href = "/"; // Change to your homepage URL
        } else {
          setLoading(false); // Reset loading state

          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } else if (Cookies.get("auth_token_vendor")) {
      try {
        await axios.get("/api/v1/sanctum/csrf-cookie");
        const response = await axios.post("/api/logout");

        if (response.data.status === 200) {
          setLoading(false); // Reset loading state

          Cookies.remove("auth_token_vendor");

          Swal.fire({
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });

          window.location.href = "/vendor-login";
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setLoading(false); // Reset loading state

          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            showConfirmButton: false,
            timer: 1500,
          });

          // Redirect to the homepage when status is 401
          window.location.href = "/"; // Change to your homepage URL
        } else {
          setLoading(false); // Reset loading state

          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      {loading && <Loader />}
      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
      >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </MDBox>
          {isMini ? null : (
            <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
              {/* <form onSubmit={handleSubmit(onSubmit)}>
                <MDBox pr={1}>
                  <MDInput
                    label="Search vendors"
                    type="text"
                    name="search"
                    defaultValue=""
                    {...register("search", { required: false })}
                  />
                </MDBox>
              </form> */}
              <MDBox color={light ? "white" : "inherit"}>
                <Link to="/">
                  <IconButton sx={navbarIconButton} size="small" disableRipple>
                    <Icon sx={iconsStyle}>home</Icon>
                  </IconButton>
                </Link>

                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon sx={iconsStyle} fontSize="medium">
                    {miniSidenav ? "menu_open" : "menu"}
                  </Icon>
                </IconButton>

                {/* <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <Icon sx={iconsStyle}>notifications</Icon>
                </IconButton>
                {renderMenu()} */}
                {/* <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={handleConfiguratorOpen}
                >
                  <Icon sx={iconsStyle}>settings</Icon>
                </IconButton> */}
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenAccount}
                >
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
                {renderAccount()}
              </MDBox>
            </MDBox>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
