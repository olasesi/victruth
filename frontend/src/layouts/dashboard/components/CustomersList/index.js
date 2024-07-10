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
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Material Dashboard 2 React examples
import VendorsDataTable from "examples/Tables/VendorsDataTable";

//loader
import Loader from "loader/loader";

// Data
import data from "layouts/dashboard/components/VendorsList/data";

function CustomersList() {
  //const { columns, rows } = data();

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  const myStyle = {
    border: "none",
    backgroundColor: "transparent",
  };

  const [ordersTable, setOrdersTable] = useState({
    columns: [
      { Header: "#", accessor: "number", align: "center" },
      { Header: "Fullname", accessor: "fullname", align: "center" },

      { Header: "Email", accessor: "email", align: "center" },
      { Header: "Phone", accessor: "phone", align: "center" },

      { Header: "Date", accessor: "date", align: "center" },
    ],
    rows: [], // Initially, an empty array for rows
  });

  const [confirm, setConfirm] = useState(1);
  const [ordersTableLoading, setOrdersTableLoading] = useState(false);
  const [noRecordsFound, setNoRecordsFound] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-customers")
        .then(function (response) {
          if (response.data.status === 200) {
            const fetchedData = response.data.users.data;
            if (fetchedData.length === 0) {
              // Handle case when there are no records
              setOrdersTableLoading(true); // Set loading to true
              setNoRecordsFound(true); // Set a state variable to indicate no records found
            } else {
              const format = fetchedData.map((item, index) => ({
                number: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {index + 1}
                  </MDTypography>
                ),
                fullname: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.fullname}
                  </MDTypography>
                ),
                email: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.email}
                  </MDTypography>
                ),
                phone: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.phone}
                  </MDTypography>
                ),
                date: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.created_at}
                  </MDTypography>
                ),
              }));

              setOrdersTable((ordersTable) => ({
                ...ordersTable,
                rows: format,
              }));

              setOrdersTableLoading(true);
            }
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

  return (
    <>
      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Customers
            </MDTypography>
          </MDBox>
          <MDBox color="text" px={2}></MDBox>
          {renderMenu}
        </MDBox>
        <MDBox>
          {
            ordersTableLoading && !noRecordsFound ? (
              <VendorsDataTable
                //table={{ columns, rows }}
                table={ordersTable}
                showTotalEntries={false}
                isSorted={false}
                noEndBorder
                entriesPerPage={false}
              />
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
            ) // Replace LoadingSpinner with your loading component
          }
        </MDBox>
      </Card>
    </>
  );
}

export default CustomersList;
