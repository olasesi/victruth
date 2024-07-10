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

function Settings() {
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [websiteName, setWebsiteName] = useState({});
  const [loading, setLoading] = useState(false);
  const [countletter, setCountletter] = useState("");
  const [moreThan160, setMoreThan160] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoData, setLogoData] = useState(null);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-website-settings")
        .then(function (response) {
          setLoading(true);
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

  const countCharacter = (e) => {
    const str = e.target.value;
    setCountletter(str.length);
    if (str.length > 160) {
      setMoreThan160(true);
    } else if (str.length < 160) {
      setMoreThan160(false);
    }
  };

  const handleLogoChange = (e) => {
    const changedLogo = e.target.files[0];
    setLogo(changedLogo);

    if (changedLogo) {
      const reader = new FileReader();

      reader.onload = (event) => {
        // `event.target.result` contains the base64-encoded image data
        const imageData = event.target.result;

        // Set the image data to the state
        setLogoData(imageData);
      };

      // Read the selected image as a data URL
      reader.readAsDataURL(changedLogo);
    }
  };

  const onSubmit = (data) => {
    const formData = {
      website_name: data.website_name,
      meta_description: data.meta_description,
      address: data.address,
      email: data.email,
      email2: data.email2,
      phone: data.phone,
      phone2: data.phone2,
      upload_logo: logo,
    };

    setUploading(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/update-website-settings", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
          if (response.data.status === 200) {
            setUploading(false);
            Swal.fire({
              icon: "success",
              title: "Settings now updated successfully!",
              showConfirmButton: false,
              timer: 3000,
            });
            window.location.reload();
          } else if (response.data.status === 401) {
            setUploading(false);
            Swal.fire({
              icon: "error",
              title: "Error in input or upload",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        })
        .catch(function (error) {
          setUploading(false);
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
      {uploading && <Loader />}
      {!loading && <Loader />}
      <DashboardLayout>
        <DashboardNavbar />
        <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
          <AppBar position="static">
            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
              <Tab
                label="Settings"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    settings
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
                    Settings
                  </MDTypography>
                </MDBox>

                <Card>
                  <MDBox pt={4} pb={3} px={3}>
                    <MDBox role="form">
                      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="website_name"
                              label="Website name*"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.website_setting[0].value}
                              {...register("website_name", { required: true, minLength: 3 })}
                            />
                          )}
                          <input name="website_name" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.website_name && <span>Please enter a valid website name</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              label="Meta description*"
                              variant="standard"
                              fullWidth
                              multiline
                              rows={3}
                              name="meta_description"
                              defaultValue={websiteName.website_setting[3].value}
                              {...register("meta_description", { required: true })}
                              onKeyUp={countCharacter}
                            />
                          )}
                          <input name="meta_description" type="hidden" />

                          {loading && (
                            <MDTypography
                              variant="overline"
                              color={moreThan160 ? "primary" : "info"}
                              textGradient
                            >
                              {`
                            ${countletter}
                             (Number of characters) `}
                              <span style={{ display: "block", lineHeight: "1" }}>
                                Around 160 characters will be optimum for a meta description
                              </span>
                            </MDTypography>
                          )}
                          <br />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.meta_description && <span>Please enter meta description</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="address"
                              label="Address*"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.website_setting[4].value}
                              {...register("address", { required: true, minLength: 3 })}
                            />
                          )}
                          <input name="address" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.address && (
                              <span>Please enter a valid address. At least characters long</span>
                            )}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="email"
                              name="email"
                              label="Email 1"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.website_setting[5].value}
                              {...register("email", { required: false, pattern: EmailPregMatch })}
                            />
                          )}
                          <input name="email" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.email && <span>Please enter a valid email address</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="email"
                              name="email2"
                              label="Email 2"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.website_setting[6].value}
                              {...register("email2", { required: false, pattern: EmailPregMatch })}
                            />
                          )}
                          <input name="email2" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.email2 && <span>Please enter a valid email address</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="phone"
                              label="Phone 1"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.website_setting[7].value}
                              {...register("phone", { required: false, pattern: PhonePregMatch })}
                            />
                          )}
                          <input name="phone" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.phone && <span>Please enter a valid phone number</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="phone2"
                              label="Phone 2"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.website_setting[8].value}
                              {...register("phone2", { required: false, pattern: PhonePregMatch })}
                            />
                          )}
                          <input name="phone2" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.phone2 && <span>Please enter a valid phone number</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2} style={{ width: "200px" }}>
                          {loading && (
                            <img
                              src={BASE_URL + websiteName.website_setting[1].value}
                              alt={websiteName.website_setting[0].value}
                              title={websiteName.website_setting[0].value}
                              style={{
                                width: "200px",
                                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                borderRadius: "6px",
                                marginBottom: "5px",
                              }}
                            />
                          )}
                          {logo && (
                            <div style={{ marginTop: "10px" }}>
                              <p>Preview:</p>
                              <img
                                src={logoData}
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
                            name="upload_logo"
                            onChange={handleLogoChange}
                            accept="image/*"
                          />
                          <input name="upload_logo" type="hidden" />

                          <label htmlFor="contained-button-file">
                            <MDButton variant="contained" color="info" component="span">
                              Upload new logo
                            </MDButton>
                          </label>
                        </MDBox>

                        <MDBox mt={4} mb={1}>
                          <button disabled={uploading} style={myStyle}>
                            <MDButton variant="gradient" color="warning" fullWidth>
                              Update info
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

export default Settings;
