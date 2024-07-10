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
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  const [latestCustomer, setLatestCustomer] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/latest-customer")
        .then(function (response) {
          if (response.data.status === 200) {
            setLatestCustomer(response.data.latest_customer);
            setLoading(true);
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

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Customers
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              latest customers
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {loading &&
          latestCustomer.map((customer) => {
            return (
              <TimelineItem
                key={customer.id}
                color="success"
                icon="notifications"
                title={`${customer.fullname} (${customer.email})`}
                dateTime={`${customer.phone === null ? "" : customer.phone} | ${
                  customer.created_at
                }`}
              />
            );
          })}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
