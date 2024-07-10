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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import VendorsTimelineItem from "examples/VendorsTimeline/VendorsTimelineItem";

//loader
import Loader from "loader/loader";

function CustomersOverview() {
  const [websiteName, setWebsiteName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noRecordsFound, setNoRecordsFound] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-customers-that-never-ordered")
        .then(function (response) {
          console.log(response);
          if (response.data.status === 200) {
            const fetchedData = response.data.users.data;
            if (fetchedData.length === 0) {
              // Handle case when there are no records
              setLoading(true); // Set loading to true
              setNoRecordsFound(true); // Set a state variable to indicate no records found
            } else {
              setWebsiteName(response.data.users.data);
              setLoading(true);
            }
          }
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error.response);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Customers that have not ordered
        </MDTypography>
      </MDBox>
      <MDBox p={2} key={confirm.email}>
        {
          loading && !noRecordsFound ? (
            websiteName.map((confirm) => {
              return (
                <>
                  <VendorsTimelineItem
                    color="error"
                    icon="notifications"
                    title={`${confirm.fullname} (${confirm.email})`}
                    dateTime={`${confirm.phone === null ? "" : confirm.phone} | ${
                      confirm.created_at
                    }`}
                  />
                </>
              );
            })
          ) : noRecordsFound ? (
            // Display a message or component when no records are found
            <MDBox pt={3} px={3}>
              <MDTypography variant="caption" color="text" fontWeight="medium">
                No records found
              </MDTypography>
            </MDBox>
          ) : (
            // Render a loading spinner or component while data is being fetched
            <Loader />
          ) // Replace LoadingSpi
        }
      </MDBox>
    </Card>
  );
}

export default CustomersOverview;
