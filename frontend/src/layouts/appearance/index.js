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
import { EmailPregMatch } from "general/emailpregmatch";
import { PhonePregMatch } from "general/phonepregmatch";
//
import Loader from "loader/loader";

function Appearance() {
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

  const [websiteName, setWebsiteName] = useState(undefined);
  const [clickButton, setClickButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(null);
  const [sliderData, setSliderData] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [sliderData2, setSliderData2] = useState(null);
  const [slider3, setSlider3] = useState(null);
  const [sliderData3, setSliderData3] = useState(null);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-appearance")
        .then(function (response) {
          if (response.data.status === 200) {
            setWebsiteName(response.data);
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

  const handleSliderChange = (e, sliderIndex) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 0) {
      const changedSlider = selectedFiles[0]; // Always consider the first file for simplicity

      if (sliderIndex === 1) {
        setSlider(changedSlider);
      } else if (sliderIndex === 2) {
        setSlider2(changedSlider);
      } else if (sliderIndex === 3) {
        setSlider3(changedSlider);
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const imageData = event.target.result;
        if (sliderIndex === 1) {
          setSliderData(imageData);
        } else if (sliderIndex === 2) {
          setSliderData2(imageData);
        } else if (sliderIndex === 3) {
          setSliderData3(imageData);
        }
      };

      reader.readAsDataURL(changedSlider);
    }
  };

  const onSubmit = (data) => {
    setClickButton(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post(
          "/api/update-appearance",
          {
            heading: data.heading,
            paragraph1: data.paragraph1,
            paragraph2: data.paragraph2,
            slider: slider,
            slider2: slider2,
            slider3: slider3,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(function (response) {
          if (response.data.status === 200) {
            setClickButton(false);
            Swal.fire({
              icon: "success",
              title: "Appearance settings has now been updated successfully!",
              showConfirmButton: false,
              timer: 3000,
            });
            window.location.reload();
          } else {
            setClickButton(false);
            Swal.fire({
              icon: "error",
              title: "Invalid input or upload",
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
                label="Appearance"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    monitor
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
                    Appearance
                  </MDTypography>
                </MDBox>

                <Card>
                  <MDBox pt={4} pb={3} px={3}>
                    <MDBox role="form">
                      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="heading"
                              label="Heading"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.appearance[0].value}
                              {...register("heading", { required: false, maxLength: 50 })}
                            />
                          )}
                          <input name="heading" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.heading && <span>Maximum character is 50</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              label="Paragraph 1"
                              variant="standard"
                              fullWidth
                              multiline
                              rows={3}
                              name="paragraph1"
                              defaultValue={websiteName.appearance[1].value}
                              {...register("paragraph1", { required: false })}
                            />
                          )}
                          <input
                            name="paragraph1"
                            type="hidden"
                            // value={websiteSettings.website_setting[4].value}
                          />
                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.paragraph && <span>Maximum character is 50</span>}
                          </MDTypography>

                          <br />
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="paragraph2"
                              label="Paragraph 2"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.appearance[2].value}
                              {...register("paragraph2", { required: false, maxLength: 50 })}
                            />
                          )}
                          <input name="paragraph2" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.paragraph2 && <span>Maximum character is 50</span>}
                          </MDTypography>
                        </MDBox>

                        <MDBox mb={2} style={{ width: "200px" }}>
                          {loading && (
                            <img
                              src={BASE_URL + websiteName.appearance[3].value}
                              alt={websiteName.appearance[3].name}
                              title={websiteName.appearance[3].name}
                              style={{
                                width: "200px",
                                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                borderRadius: "6px",
                                marginBottom: "5px",
                              }}
                            />
                          )}
                          {slider && (
                            <div style={{ marginTop: "10px" }}>
                              <p>Preview:</p>
                              <img
                                src={sliderData}
                                alt="Image Preview"
                                style={{
                                  width: "200px",
                                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                  borderRadius: "6px",
                                  marginBottom: "5px",
                                }}
                              />
                            </div>
                          )}
                          <input
                            style={{ display: "none" }}
                            id="contained-button-file"
                            type="file"
                            name="slider"
                            onChange={(e) => {
                              handleSliderChange(e, 1);
                            }}
                            accept="image/*"
                            multiple
                          />

                          <label htmlFor="contained-button-file">
                            <MDButton variant="contained" color="info" component="span">
                              Upload new slider 1
                            </MDButton>
                          </label>
                        </MDBox>
                        <hr />
                        <MDBox mb={2} style={{ width: "200px" }}>
                          {loading && (
                            <img
                              src={BASE_URL + websiteName.appearance[4].value}
                              alt={websiteName.appearance[4].name}
                              title={websiteName.appearance[4].name}
                              style={{
                                width: "200px",
                                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                borderRadius: "6px",
                                marginBottom: "5px",
                              }}
                            />
                          )}
                          {slider2 && (
                            <div style={{ marginTop: "10px" }}>
                              <p>Preview:</p>
                              <img
                                src={sliderData2}
                                alt="Image Preview"
                                style={{
                                  width: "200px",
                                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                  borderRadius: "6px",
                                  marginBottom: "5px",
                                }}
                              />
                            </div>
                          )}
                          <input
                            style={{ display: "none" }}
                            id="contained-button-file-2"
                            type="file"
                            name="slider2"
                            onChange={(e) => {
                              handleSliderChange(e, 2);
                            }}
                            accept="image/*"
                            multiple
                          />

                          <label htmlFor="contained-button-file-2">
                            <MDButton variant="contained" color="info" component="span">
                              Upload new slider 2
                            </MDButton>
                          </label>
                        </MDBox>
                        <hr />
                        <MDBox mb={2} style={{ width: "200px" }}>
                          {loading && (
                            <img
                              src={BASE_URL + websiteName.appearance[5].value}
                              alt={websiteName.appearance[5].name}
                              title={websiteName.appearance[5].name}
                              style={{
                                width: "200px",
                                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                borderRadius: "6px",
                                marginBottom: "5px",
                              }}
                            />
                          )}
                          {slider3 && (
                            <div style={{ marginTop: "10px" }}>
                              <p>Preview:</p>
                              <img
                                src={sliderData3}
                                alt="Image Preview"
                                style={{
                                  width: "200px",
                                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                  borderRadius: "6px",
                                  marginBottom: "5px",
                                }}
                              />
                            </div>
                          )}
                          <input
                            style={{ display: "none" }}
                            id="contained-button-file-3"
                            type="file"
                            name="slider3"
                            onChange={(e) => {
                              handleSliderChange(e, 3);
                            }}
                            accept="image/*"
                            multiple
                          />

                          <label htmlFor="contained-button-file-3">
                            <MDButton variant="contained" color="info" component="span">
                              Upload new slider 3
                            </MDButton>
                          </label>
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                          <button style={myStyle} disabled={clickButton}>
                            <MDButton variant="gradient" color="warning" fullWidth>
                              Update appearance
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

export default Appearance;
