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
//
import { states } from "../../general/states";
// react-router-dom components

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
//
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// Authentication layout components

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
//

//
import Loader from "loader/loader";

function Profile() {
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
  const [uploading, setUploading] = useState(false);
  const [vendorPicture, setVendorPicture] = useState(null);
  const [vendorPictureData, setVendorPictureData] = useState(null);
  // const [vendorLogoImage, setVendorLogoImage] = useState(null);
  // const [logoData, setLogoData] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderError, setGenderError] = useState("");
  // const [genderOptions, setGenderOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [categoryError, setCategoryError] = useState(false);
  //
  const [stateError, setStateError] = useState(false);
  //
  const [countletter, setCountletter] = useState("");
  const [moreThan200, setMoreThan200] = useState(false);
  //
  const [countBusiness, setCountBusiness] = useState("");
  const [moreThanBusiness500, setMoreThanBusiness500] = useState(false);
  //
  const [charges, setcharges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () =>
      // Make an API request to fetch gender options
      {
        await axios
          .get("/api/show-category-section")
          .then((response) => {
            if (response.data.status === 200) {
              if (response.data && response.data.category_section) {
                setCategoryOptions(response.data.category_section);
                setIsLoading(false);
              }
            }
          })
          .catch((error) => {
            setIsLoading(false);

            Swal.fire({
              icon: "error",
              title: "An Error Occured!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    );
  }, []);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      try {
        const response = await axios.get("/api/edit-vendor");
        if (response.data.status === 200) {
          const userData = response.data.user; // Extract user data from the response
          setWebsiteName(userData); // Adjust to match your actual property names
          setSelectedCategory(userData.category);
          setSelectedState(userData.state);
          setSelectedGender(userData.gender);
          setLoading(true);
        } else if (response.data.status === 401) {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        setLoading(false);
        console.error("An error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "An Error Occurred!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }, []);

  const handleVendorPictureChange = (e) => {
    const changedVendorPicture = e.target.files[0];
    setVendorPicture(changedVendorPicture);
    if (changedVendorPicture) {
      const reader = new FileReader();

      reader.onload = (event) => {
        // `event.target.result` contains the base64-encoded image data
        const imageData = event.target.result;

        // Set the image data to the state
        setVendorPictureData(imageData);
      };

      // Read the selected image as a data URL
      reader.readAsDataURL(changedVendorPicture);
    }
  };

  const handleCategoryChange = (event) => {
    const choosenCategory = event.target.value;
    setSelectedCategory(choosenCategory);
  };

  const handleStateChange = (event) => {
    const choosenState = event.target.value;
    setSelectedState(choosenState);
  };

  const countCharacter = (e) => {
    const str = e.target.value;
    setCountletter(str.length);
    if (str.length > 200) {
      setMoreThan200(true);
    } else if (str.length < 200) {
      setMoreThan200(false);
    }
  };

  const countBusinessDescription = (e) => {
    const str = e.target.value;
    setCountBusiness(str.length);
    if (str.length > 500) {
      setMoreThanBusiness500(true);
    } else if (str.length < 500) {
      setMoreThanBusiness500(false);
    }
  };

  const changeGender = (event) => {
    const selectedValue = event.target.value;
    setSelectedGender(selectedValue);

    if (selectedValue === "") {
      setSelectedGender(null);
    } else {
      setGenderError("");
    }
  };

  const onSubmit = (data) => {
    const formData = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      business_name: data.business_name,
      business_description: data.business_description,
      facebook: data.facebook,
      twitter: data.twitter,
      instagram: data.instagram,
      phone: data.phone,
      gender: selectedGender,
      profile_picture: vendorPicture,
      city: data.city,
      website: data.website,
      bio: data.bio,
      occupation: data.occupation,
      state: selectedState,
      city: data.city,
      address: data.address,
      //vendor_business_image: vendorLogoImage,
      category: selectedCategory,
      charges: data.charges,
    };

    setUploading(true);

    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/update-vendor", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
          if (response.data.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Profile now updated successfully!",
              showConfirmButton: false,
              timer: 3000,
            });
            setUploading(false);

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
                label="Profile"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    profile
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
                    Profile
                  </MDTypography>
                </MDBox>

                <Card>
                  <MDBox pt={4} pb={3} px={3}>
                    <MDBox role="form">
                      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
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
                          <p>Current image *</p>
                          {vendorPicture && (
                            <div style={{ marginTop: "10px" }}>
                              <p>Preview: </p>
                              <img
                                src={vendorPictureData}
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
                            name="profile_picture"
                            onChange={handleVendorPictureChange}
                            accept="image/*"
                          />

                          <input name="profile_picture" type="hidden" />

                          <label htmlFor="contained-button-file">
                            <MDButton variant="contained" color="info" component="span">
                              Upload new vendor picture *
                            </MDButton>
                          </label>
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
                        <FormControl fullWidth variant="standard">
                          <InputLabel htmlFor="gender-select">Gender</InputLabel>
                          {loading && (
                            <Select
                              value={selectedGender}
                              onChange={changeGender}
                              inputProps={{
                                id: "gender-select",
                                name: "gender",
                              }}
                              name="gender"
                            >
                              <MenuItem value="">Choose Gender</MenuItem>
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                            </Select>
                          )}
                        </FormControl>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="bio"
                              label="Bio"
                              variant="standard"
                              fullWidth
                              multiline
                              rows={3}
                              defaultValue={websiteName.bio}
                              {...register("bio", { maxLength: 200 })}
                              onKeyUp={countCharacter}
                            />
                          )}
                          {loading && (
                            <MDTypography
                              variant="overline"
                              color={moreThan200 ? "primary" : "info"}
                              textGradient
                            >
                              {`
                            ${countletter}
                             (Number of characters) `}
                              <span style={{ display: "block", lineHeight: "1" }}>
                                Character should not be more than 200
                              </span>
                            </MDTypography>
                          )}
                          <input name="bio" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.bio && <span>Character is more than 200 characters</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              label="Occupation"
                              variant="standard"
                              fullWidth
                              name="occupation"
                              defaultValue={websiteName.occupation}
                              {...register("occupation", {
                                maxLength: 30,
                                pattern: {
                                  value: /^[A-Z a-z\s]+$/,
                                  message: "Only letters and spaces are allowed",
                                },
                              })}
                            />
                          )}
                          <input name="occupation" type="hidden" />

                          <br />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.occupation && <span>Please enter occupation</span>}
                          </MDTypography>
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
                          <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="category-select">Category*</InputLabel>
                            <Select
                              value={selectedCategory}
                              onChange={handleCategoryChange}
                              inputProps={{
                                id: "category-select",
                                name: "category",
                              }}
                              name="category"
                            >
                              {isLoading ? (
                                <MenuItem value="" disabled>
                                  Loading...
                                </MenuItem>
                              ) : (
                                categoryOptions.map((option) => (
                                  <MenuItem key={option.category} value={option.category}>
                                    {option.category}
                                  </MenuItem>
                                ))
                              )}
                            </Select>
                          </FormControl>
                          <MDTypography variant="overline" color="error" textGradient>
                            {categoryError && <span>Please choose category</span>}
                          </MDTypography>
                        </MDBox>

                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="business_description"
                              label="Business description*"
                              variant="standard"
                              fullWidth
                              multiline
                              rows={3}
                              defaultValue={websiteName.business_description}
                              {...register("business_description", {
                                required: true,
                                minLength: 3,
                                maxLength: 500,
                              })}
                              onKeyUp={countBusinessDescription}
                            />
                          )}
                          {loading && (
                            <MDTypography
                              variant="overline"
                              color={moreThanBusiness500 ? "primary" : "info"}
                              textGradient
                            >
                              {`
                            ${countBusiness}
                             (Number of characters) `}
                              <span style={{ display: "block", lineHeight: "1" }}>
                                Character should not be more than 500
                              </span>
                            </MDTypography>
                          )}

                          <input name="business_description" type="hidden" />
                          <br />
                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.business_description && (
                              <span>Characters should not be more than 500</span>
                            )}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="charges"
                              label="Charges e.g per hour, etc"
                              variant="standard"
                              fullWidth
                              multiline
                              rows={5}
                              defaultValue={websiteName.charges}
                              {...register("charges", { maxLength: 5000 })}
                            />
                          )}

                          <input name="charges" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.charges && <span>Character is more than 5000 characters</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              label="Phone*"
                              variant="standard"
                              fullWidth
                              name="phone"
                              defaultValue={websiteName.phone}
                              {...register("phone", {
                                required: true,
                                pattern: {
                                  value: /^0\d{10}$/,
                                  message: "Please enter valid phone number",
                                },
                              })}
                            />
                          )}
                          <input name="phone" type="hidden" />

                          <br />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.phone && <span>Please enter valid phone number</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="website"
                              label="Website name"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.website}
                              {...register("website", {
                                pattern: {
                                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                                  message: "Please enter a valid website URL.  Add https://",
                                },
                              })}
                            />
                          )}
                          <input name="website" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.website && <span>Please enter your website name</span>}
                          </MDTypography>
                        </MDBox>

                        <MDBox mb={2}>
                          <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="state-select">State*</InputLabel>
                            <Select
                              value={selectedState}
                              onChange={handleStateChange}
                              inputProps={{
                                id: "state-select",
                                name: "state",
                              }}
                              name="state"
                            >
                              {isLoading ? (
                                <MenuItem value="" disabled>
                                  Loading...
                                </MenuItem>
                              ) : (
                                states.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))
                              )}
                            </Select>
                          </FormControl>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="city"
                              label="City*"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.city}
                              {...register("city", {
                                required: true,
                                maxLength: 30,
                                pattern: {
                                  value: /^[A-Za-z\s]*$/,
                                  message: "Please enter a valid city (letters and spaces only).",
                                },
                              })}
                            />
                          )}
                          <input name="city" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.city && <span>Please enter city</span>}
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
                              defaultValue={websiteName.address}
                              {...register("address", {
                                required: true,
                                maxLength: 60,
                              })}
                            />
                          )}
                          <input name="address" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.address && <span>Please enter a valid address.</span>}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="facebook"
                              label="Facebook Page URL"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.facebook}
                              {...register("facebook", {
                                required: false,
                                pattern: {
                                  value:
                                    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?].*)?$/,
                                  message: "Please enter your facebook page URL.  Add https://",
                                },
                              })}
                            />
                          )}
                          <input name="facebook" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.facebook && (
                              <span>Please enter a valid business facebook page URL.</span>
                            )}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="instagram"
                              label="Instagram Page URL"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.instagram}
                              {...register("instagram", {
                                required: false,
                                pattern: {
                                  value:
                                    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?].*)?$/,
                                  message: "Please enter your instagram page URL.  Add https://",
                                },
                              })}
                            />
                          )}
                          <input name="instagram" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.instagram && (
                              <span>Please enter a valid instagram page URL.</span>
                            )}
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                          {loading && (
                            <MDInput
                              type="text"
                              name="Twitter"
                              label="Twitter Page URL"
                              variant="standard"
                              fullWidth
                              defaultValue={websiteName.twitter}
                              {...register("twitter", {
                                required: false,
                                pattern: {
                                  value:
                                    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?].*)?$/,
                                  message: "Please enter your twitter page URL. Add https://",
                                },
                              })}
                            />
                          )}
                          <input name="twitter" type="hidden" />

                          <MDTypography variant="overline" color="error" textGradient>
                            {errors.twitter && <span>Please enter a valid twitter page URL.</span>}
                          </MDTypography>
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

export default Profile;
