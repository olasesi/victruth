/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (business) =>
    business.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const [websiteName, setWebsiteName] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-vendors")
        .then(function (response) {
          //setLoading(true);
          if (response.data.status === 200) {
            setWebsiteName(response.data.users.data);
            setLoading(true);
            console.log(response.data.users);
            console.log("hello");
          }
        })
        .catch(function (error) {
          setLoading(false);

          Swal.fire({
            icon: "error",
            title: "Error Loading Data",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  }, []);

  return {
    columns: [
      { Header: "fullname", accessor: "fullname", width: "45%", align: "left" },
      { Header: "status", accessor: "status", width: "45%", align: "left" },
      { Header: "business", accessor: "business", width: "10%", align: "left" },
      { Header: "category", accessor: "category", width: "10%", align: "left" },
      { Header: "email", accessor: "email", align: "center" },
      { Header: "phone", accessor: "phone", align: "center" },
      { Header: "address", accessor: "address", align: "center" },
      { Header: "date", accessor: "date", align: "center" },
    ],

    // rows: [
    //   {
    //     fullname: <Company image={logoXD} name="Material UI XD Version" />,
    //     status: <Company image={logoXD} name="Material UI XD Version" />,

    //     business: (
    //       <MDBox display="flex" py={1}>
    //         {avatars([
    //           [team1, "Ryan Tompson"],
    //           [team2, "Romina Hadid"],
    //           [team3, "Alexander Smith"],
    //           [team4, "Jessica Doe"],
    //         ])}
    //       </MDBox>
    //     ),
    //     category: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         $14,000
    //       </MDTypography>
    //     ),
    //     email: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {loading && websiteName[0].firstname}
    //       </MDTypography>
    //     ),
    //     phone: (
    //       <MDBox width="8rem" textAlign="left">
    //         <MDProgress value={60} color="info" variant="gradient" label={false} />
    //       </MDBox>
    //     ),
    //     address: (
    //       <MDBox width="8rem" textAlign="left">
    //         <MDProgress value={60} color="info" variant="gradient" label={false} />
    //       </MDBox>
    //     ),
    //     date: (
    //       <MDBox width="8rem" textAlign="left">
    //         <MDProgress value={60} color="info" variant="gradient" label={false} />
    //       </MDBox>
    //     ),
    //   },
    // ],

    rows: [
      loading &&
        websiteName.map((list) => {
          ({
            fullname: (
              <MDTypography variant="caption" color="text" fontWeight="medium" key={list.email}>
                {`${list.firstname} ${list.lastname}`}
              </MDTypography>
            ),
            status: <Company image={logoXD} name="Material UI XD Version" />,

            business: (
              <MDBox display="flex" py={1}>
                {avatars([
                  [team1, "Ryan Tompson"],
                  [team2, "Romina Hadid"],
                  [team3, "Alexander Smith"],
                  [team4, "Jessica Doe"],
                ])}
              </MDBox>
            ),
            category: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                $14,000
              </MDTypography>
            ),
            email: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                $14,000
              </MDTypography>
            ),
            phone: (
              <MDBox width="8rem" textAlign="left">
                <MDProgress value={60} color="info" variant="gradient" label={false} />
              </MDBox>
            ),
            address: (
              <MDBox width="8rem" textAlign="left">
                <MDProgress value={60} color="info" variant="gradient" label={false} />
              </MDBox>
            ),
            date: (
              <MDBox width="8rem" textAlign="left">
                <MDProgress value={60} color="info" variant="gradient" label={false} />
              </MDBox>
            ),
          });
        }),
    ],
  };
}
