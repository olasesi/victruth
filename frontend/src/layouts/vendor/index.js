import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import breakpoints from "assets/theme/base/breakpoints";
import Swal from "sweetalert2";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
//

import Loader from "loader/loader";

function Vendor() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const { id } = useParams();
  const [websiteName, setWebsiteName] = useState({});
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [loadingUnconfirm, setLoadingUnconfirm] = useState(false);
  const [actionCompletedConfirmed, setActionCompletedConfirmed] = useState(false);
  const [actionCompletedUnconfirmed, setActionCompletedUnconfirmed] = useState(false);

  const confirmVendor = (e, id) => {
    e.preventDefault(); // Prevent default form submission
    setLoadingConfirm(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .patch(`/api/confirm-vendor/${id}`)
        .then(function (response) {
          console.log(response);
          if (response.data.status === 200) {
            setLoadingConfirm(false);
            setActionCompletedConfirmed(true);

            Swal.fire({
              icon: "success",
              title: "Vendor has now been successfully confirmed",
              showConfirmButton: false,
              timer: 3000,
            });
            // window.location.reload();
          } else if (response.data.status === 404) {
            setLoadingConfirm(false);
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch(function (error) {
          setLoadingConfirm(false);
          Swal.fire({
            icon: "error",
            title: "Error Loading Data",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  useEffect(() => {
    if (actionCompletedConfirmed) {
      // Reload the page to get the most recent data
      window.location.reload();
    }
    if (actionCompletedUnconfirmed) {
      // Reload the page to get the most recent data
      window.location.reload();
    }
  }, [actionCompletedConfirmed, actionCompletedUnconfirmed]);

  const unconfirmVendor = (e, id) => {
    e.preventDefault(); // Prevent default form submission
    setLoadingUnconfirm(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .patch(`/api/unconfirm-vendor/${id}`)
        .then(function (response) {
          if (response.data.status === 200) {
            setLoadingUnconfirm(false);
            Swal.fire({
              icon: "success",
              title: "Vendor has now been successfully unconfirmed",
              showConfirmButton: false,
              timer: 3000,
            });
            setActionCompletedUnconfirmed(true);
            //window.location.reload();
          } else if (response.data.status === 404) {
            setLoadingUnconfirm(false);
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch(function (error) {
          setLoadingUnconfirm(false);
          Swal.fire({
            icon: "error",
            title: "Error Loading Data",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get(`/api/vendor/${id}`)
        .then(function (response) {
          setLoading(true);
          if (response.data.status === 200) {
            const result = response.data.users;
            if (result) {
              setWebsiteName(result);
              setLoading(true);
            } else {
              setNotFound(true);
              setLoading(true);
            }
          }
        })
        .catch(function (error) {
          setLoading(true);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  }, []);

  const myStyle = {
    border: "none",
    backgroundColor: "transparent",
  };

  return (
    <>
      {loadingConfirm && <Loader />}
      {loadingUnconfirm && <Loader />}
      {!loading && <Loader />}
      <DashboardLayout>
        <DashboardNavbar />
        <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
          <AppBar position="static">
            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
              <Tab
                label="Vendor"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    business
                  </Icon>
                }
              />
            </Tabs>
          </AppBar>
        </Grid>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Vendor
                  </MDTypography>
                </MDBox>
                <Card>
                  <MDBox pt={4} pb={3} px={3}>
                    <MDBox role="form">
                      {notFound ? (
                        <MDBox pt={3} px={3}>
                          <MDTypography variant="caption" color="text" fontWeight="medium">
                            No records found
                          </MDTypography>
                        </MDBox>
                      ) : (
                        <form>
                          <MDTypography variant="h4" color="text" fontWeight="medium">
                            Vendor Info
                          </MDTypography>
                          <hr />

                          <MDBox mb={2} style={{ width: "200px" }}>
                            {loading && (
                              <img
                                src={BASE_URL + websiteName.profile_picture}
                                alt={`${websiteName.firstname} ${websiteName.lastname}`}
                                title={`${websiteName.firstname} ${websiteName.lastname}`}
                                style={{
                                  width: "200px",
                                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                  borderRadius: "6px",
                                  marginBottom: "5px",
                                }}
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Firstname"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.firstname}
                                disabled
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Lastname"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.lastname}
                                disabled
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Email"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.email}
                                disabled
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Gender"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.gender}
                                disabled
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Bio"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.bio}
                                disabled
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Occupation"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.occupation}
                                disabled
                              />
                            )}
                          </MDBox>
                          <br />
                          <MDTypography variant="h4" color="text" fontWeight="medium">
                            Business Info
                          </MDTypography>
                          <hr />

                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Status"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.status}
                                disabled
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Business name"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.business_name}
                                disabled
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Business category"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.category}
                                disabled
                              />
                            )}
                          </MDBox>

                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Business description"
                                variant="standard"
                                fullWidth
                                multiline
                                rows={3}
                                defaultValue={websiteName.business_description}
                                disabled
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Charges"
                                variant="standard"
                                fullWidth
                                multiline
                                rows={5}
                                defaultValue={websiteName.charges}
                                disabled
                              />
                            )}
                          </MDBox>

                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Phone"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.phone}
                                disabled
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Website"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.website}
                                disabled
                              />
                            )}
                          </MDBox>

                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="State"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.state}
                                disabled
                              />
                            )}
                          </MDBox>
                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="City"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.city}
                                disabled
                              />
                            )}
                          </MDBox>

                          <MDBox mb={2}>
                            {loading && (
                              <MDInput
                                type="text"
                                label="Address"
                                variant="standard"
                                fullWidth
                                defaultValue={websiteName.address}
                                disabled
                              />
                            )}
                          </MDBox>
                          {loading &&
                            (websiteName.status === "Confirmed" ? (
                              <MDBox mt={4} mb={1}>
                                <button style={myStyle} disabled={loadingUnconfirm}>
                                  <MDButton
                                    variant="gradient"
                                    color="warning"
                                    fullWidth
                                    onClick={(e) => unconfirmVendor(e, websiteName.id)}
                                  >
                                    Unconfirm Vendor
                                  </MDButton>
                                </button>
                              </MDBox>
                            ) : (
                              <MDBox mt={4} mb={1}>
                                <button style={myStyle} disabled={loadingConfirm}>
                                  <MDButton
                                    variant="gradient"
                                    color="success"
                                    fullWidth
                                    onClick={(e) => confirmVendor(e, websiteName.id)}
                                  >
                                    Confirm Vendor
                                  </MDButton>
                                </button>
                              </MDBox>
                            ))}
                        </form>
                      )}
                    </MDBox>
                  </MDBox>
                </Card>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Vendor;
