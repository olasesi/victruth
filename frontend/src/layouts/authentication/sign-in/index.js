// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";
// // react-router-dom components
// import { Link, useNavigate } from "react-router-dom";
// //
// import Cookies from "js-cookie";
// // @mui material components
// import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

// // Authentication layout components
// import BasicLayout from "layouts/authentication/components/BasicLayout";

// // Images
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// function Basic() {
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSetRememberMe = () => setRememberMe(!rememberMe);

//   const navigate = useNavigate();

//   const [inputFields, setInputFields] = useState({
//     email: "",
//     password: "",
//     remember_token: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputFields({ ...inputFields, [name]: value });
//   };
//   const handleCheck = (e) => {
//     const { name, checked } = e.target;
//     setInputFields({ ...inputFields, [name]: checked });
//   };

//   const validate = (inputValues) => {
//     let errors = {};
//     const regex =
//       /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//     if (!regex.test(inputValues.email)) {
//       errors.email = "Enter a valid email address";
//     }

//     if (inputValues.password.length < 6) {
//       errors.password = "Password should not be less than 6 characters";
//     }
//     return errors;
//   };
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   useEffect(() => {
//     if (Object.keys(errors).length === 0 && submitting) {
//       finishSubmit();
//     }
//   }, [errors]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors(validate(inputFields));
//     setSubmitting(true);
//   };

//   const handleLogin = () => {
//     // Perform login logic here
//     // For simplicity, let's assume the login is successful and we have an auth token

//     // After successful login, set isLoggedIn to true
//     setIsLoggedIn(true);
//     // Redirect to the dashboard page
//     navigate("/dashboard");
//   };
//   const finishSubmit = () => {
//     axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
//       axios
//         .post("/api/login", inputFields)
//         .then(function (response) {
//           if (response.data.status === 200) {
//             Cookies.set("auth_token", response.data.token, {
//               expires: 30,
//               secure: true,
//               sameSite: "lax",
//             });

//             Swal.fire({
//               icon: "success",
//               title: response.data.message,
//               showConfirmButton: false,
//               timer: 1500,
//             });

//             {
//               handleLogin();
//             }
//           } else if (response.data.status === 401) {
//             Swal.fire({
//               icon: "error",
//               title: response.data.message,
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           }
//         })
//         .catch(function (error) {
//           Swal.fire({
//             icon: "error",
//             title: "An Error Occured!",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//         });
//     });
//   };

//   const myStyle = {
//     border: "none",
//     backgroundColor: "transparent",
//   };

//   return (
//     <BasicLayout image={bgImage}>
//       <Card>
//         <MDBox
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="info"
//           mx={2}
//           mt={-3}
//           p={2}
//           mb={1}
//           textAlign="center"
//         >
//           <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//             Admin login
//           </MDTypography>
//         </MDBox>

//         <MDBox pt={4} pb={3} px={3}>
//           <MDBox role="form">
//             <form onSubmit={handleSubmit}>
//               <MDBox mb={2}>
//                 <MDInput
//                   type="email"
//                   label="Email"
//                   fullWidth
//                   name="email"
//                   onChange={handleChange}
//                 />
//                 <input name="email" type="hidden" value={inputFields.email} />

//                 <MDTypography variant="overline" color="error" textGradient>
//                   {errors.email}
//                 </MDTypography>
//               </MDBox>
//               <MDBox mb={2}>
//                 <MDInput
//                   type="password"
//                   label="Password"
//                   fullWidth
//                   value={inputFields.password}
//                   onChange={handleChange}
//                   name="password"
//                 />
//               </MDBox>
//               <input name="password" type="hidden" value={inputFields.password} />
//               <MDTypography variant="overline" color="error" textGradient>
//                 {errors.password}
//               </MDTypography>
//               <MDBox display="flex" alignItems="center" ml={-1}>
//                 <Switch checked={rememberMe} onChange={handleSetRememberMe} />
//                 <MDTypography
//                   variant="button"
//                   fontWeight="regular"
//                   color="text"
//                   onClick={handleSetRememberMe}
//                   sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
//                 >
//                   &nbsp;&nbsp;Remember me
//                 </MDTypography>
//               </MDBox>
//               <MDBox mt={4} mb={1}>
//                 <button style={myStyle}>
//                   <MDButton variant="gradient" color="info" fullWidth>
//                     sign in
//                   </MDButton>
//                 </button>
//               </MDBox>
//               <MDBox mt={3} mb={1} textAlign="center">
//                 <MDTypography variant="button" color="text">
//                   <MDTypography
//                     component={Link}
//                     to="/authentication/sign-up"
//                     variant="button"
//                     color="info"
//                     fontWeight="medium"
//                     textGradient
//                   >
//                     Forget password?
//                   </MDTypography>
//                 </MDTypography>
//               </MDBox>
//             </form>
//           </MDBox>
//         </MDBox>
//       </Card>
//     </BasicLayout>
//   );
// }

// export default Basic;
