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
import { useState, useEffect } from "react";
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
  const [ordersTable, setOrdersTable] = useState({
    columns: [
      { Header: "customers", accessor: "customers", width: "45%", align: "left" },
      { Header: "email", accessor: "email", align: "center" },
      { Header: "phone", accessor: "phone", align: "center" },
    ],
    rows: [], // Initially, an empty array for rows
  });
  const [ordersTableloading, setOrdersTableLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/all-orders-table")
        .then(function (response) {
          if (response.data.status === 200) {
            const fetchedData = response.data.orderTable.data;

            setOrdersTable((ordersTable) => ({
              ...ordersTable,
              rows: fetchedData,
            }));
            setOrdersTableLoading(true);
          }
        })
        .catch(function (error) {
          setOrdersTableLoading(false);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  }, []);

  // const avatars = (members) =>
  //   members.map(([image, name]) => (
  //     <Tooltip key={name} title={name} placeholder="bottom">
  //       <MDAvatar
  //         src={image}
  //         alt="name"
  //         size="xs"
  //         sx={{
  //           border: ({ borders: { borderWidth }, palette: { white } }) =>
  //             `${borderWidth[2]} solid ${white.main}`,
  //           cursor: "pointer",
  //           position: "relative",

  //           "&:not(:first-of-type)": {
  //             ml: -1.25,
  //           },

  //           "&:hover, &:focus": {
  //             zIndex: "10",
  //           },
  //         }}
  //       />
  //     </Tooltip>
  //   ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  // useEffect(() => {
  //   // Fetch data from the API when the component mounts
  //   axios.get("/api/fetch-all-orders-table").then((response) => {
  //     if (response.data.status === 200) {
  //       // Assuming the response data structure matches the expected format
  //       const fetchedData = response.data.data;

  //       // Update the state with the fetched rows
  //       setData((prevState) => ({
  //         ...prevState,
  //         rows: fetchedData,
  //       }));
  //     }
  //   });
  // }, []);

  return {
    columns: [
      { Header: "customers", accessor: "customers", width: "45%", align: "left" },

      { Header: "email", accessor: "email", align: "center" },
      { Header: "phone", accessor: "phone", align: "center" },
    ],

    rows: [
      {
        customers: <Company image={logoXD} name="Material UI XD Version" />,

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
      },
    ],
  };
}
