import { useState, useEffect } from "react";
import breakpoints from "assets/theme/base/breakpoints";
import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";

// Material Dashboard 2 React Examples
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Fab } from "@mui/material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

// react-router-dom components
import { Link, useParams } from "react-router-dom";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
//
import Loader from "loader/loader";

function SocialMedia() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [socialMedia, setSocialMedia] = useState("");
  const [loading, setLoading] = useState(false);
  const [clickButton, setClickButton] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-social-media")
        .then(function (response) {
          if (response.data.status === 200) {
            setSocialMedia(response.data);
            setLoading(true);
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

  const onSubmit = (data) => {
    setClickButton(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .patch("/api/update-social-media", {
          facebook_url: data.facebook,
          twitter_url: data.twitter,
          instagram_url: data.instagram,
          whatsapp_url: data.whatsapp,
        })
        .then(function (response) {
          if (response.data.status === 200) {
            setClickButton(false);

            Swal.fire({
              icon: "success",
              title: "Social media info now updated successfully!",
              showConfirmButton: false,
              timer: 3000,
            });
          } else if (response.data.validator_errors) {
            setClickButton(false);

            Swal.fire({
              icon: "error",
              title: "You entered an invalid URL",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        })
        .catch(function (error) {
          setClickButton(false);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  const myStyle = {
    border: "none",
    backgroundColor: "transparent",
  };

  return (
    <>
      {clickButton && <Loader />}
      {!loading && <Loader />}
      <DashboardLayout>
        <DashboardNavbar />
        <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
          <AppBar position="static">
            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
              <Tab
                label="Social Media"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    tag
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
                    Social Media
                  </MDTypography>
                </MDBox>

                <Card>
                  <MDBox pt={4} pb={3} px={3}>
                    <MDBox role="form">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="facebook_url"
                              label="Facebook Page URL"
                              variant="standard"
                              fullWidth
                              defaultValue={socialMedia.social_media[0].social_media_url}
                              {...register("facebook", { required: false })}
                            />
                          )}
                          <input name="website_name" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.facebook && <span>Please enter a valid Facebook page URL</span>}
                          </MDTypography>
                        </MDBox>

                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="twitter_url"
                              label="Twitter Page URL"
                              variant="standard"
                              fullWidth
                              defaultValue={socialMedia.social_media[1].social_media_url}
                              {...register("twitter", { required: false })}
                            />
                          )}
                          <input name="twitter_url" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.twitter && <span>Please enter a valid Twitter page URL</span>}
                          </MDTypography>
                        </MDBox>

                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="instagram_url"
                              label="Instagram Page URL"
                              variant="standard"
                              fullWidth
                              defaultValue={socialMedia.social_media[2].social_media_url}
                              {...register("instagram", { required: false })}
                            />
                          )}
                          <input name="instagram_url" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.instagram && (
                              <span>Please enter a valid Instagram page URL</span>
                            )}
                          </MDTypography>
                        </MDBox>

                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="whatsapp_url"
                              label="Whatsapp Link"
                              variant="standard"
                              fullWidth
                              defaultValue={socialMedia.social_media[3].social_media_url}
                              {...register("whatsapp", { required: false })}
                            />
                          )}
                          <input name="whatsapp_url" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.whatsapp && <span>Please enter a valid Whatsapp Link</span>}
                          </MDTypography>
                        </MDBox>

                        <MDBox mt={4} mb={1}>
                          <button style={myStyle} disabled={clickButton}>
                            <MDButton variant="gradient" color="warning" fullWidth>
                              Update Social Media info
                            </MDButton>
                          </button>
                        </MDBox>
                      </form>
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

export default SocialMedia;
