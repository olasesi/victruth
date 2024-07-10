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

function VendorsList() {
  //const { columns, rows } = data();
  const MAX_DESCRIPTION_LENGTH = 30;

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
      { Header: "", accessor: "edit", align: "center" },
      { Header: "#", accessor: "number", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Firstname", accessor: "firstname", align: "center" },
      { Header: "Lastname", accessor: "lastname", align: "center" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "Phone", accessor: "phone", align: "center" },
      { Header: "Category", accessor: "category", align: "center" },
      { Header: "Business name", accessor: "businessname", align: "center" },
      { Header: "Business description", accessor: "businessdescription", align: "center" },

      { Header: "State", accessor: "state", align: "center" },
      { Header: "Date", accessor: "date", align: "center" },
    ],
    rows: [], // Initially, an empty array for rows
  });

  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [loadingUnconfirm, setLoadingUnconfirm] = useState(false);
  const [ordersTableLoading, setOrdersTableLoading] = useState(false);
  const [noRecordsFound, setNoRecordsFound] = useState(false);
  const [actionCompletedConfirmed, setActionCompletedConfirmed] = useState(false);
  const [actionCompletedUnconfirmed, setActionCompletedUnconfirmed] = useState(false);

  const confirmVendor = (id) => {
    setLoadingConfirm(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .patch(`/api/confirm-vendor/${id}`)
        .then(function (response) {
          if (response.data.status === 200) {
            setLoadingConfirm(false);
            Swal.fire({
              icon: "success",
              title: "Vendor has now been successfully confirmed",
              showConfirmButton: false,
              timer: 3000,
            });
            setActionCompletedConfirmed(true);
          } else if (response.data.status === 404) {
            setLoadingConfirm(false);
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch(function (error) {
          setLoadingConfirm(false);
          Swal.fire({
            icon: "error",
            title: "Error Loading Data",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  useEffect(() => {
    if (actionCompletedConfirmed) {
      // Reload the page to get the most recent data
      window.location.reload();
    }
    if (actionCompletedUnconfirmed) {
      // Reload the page to get the most recent data
      window.location.reload();
    }
  }, [actionCompletedConfirmed, actionCompletedUnconfirmed]);

  const unconfirmVendor = (id) => {
    setLoadingUnconfirm(true);

    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .patch(`/api/unconfirm-vendor/${id}`)
        .then(function (response) {
          if (response.data.status === 200) {
            setLoadingUnconfirm(false);
            Swal.fire({
              icon: "success",
              title: "Vendor has now been successfully unconfirmed",
              showConfirmButton: false,
              timer: 3000,
            });
            setActionCompletedUnconfirmed(true);
          } else if (response.data.status === 404) {
            setLoadingUnconfirm(false);
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch(function (error) {
          setLoadingUnconfirm(false);
          Swal.fire({
            icon: "error",
            title: "Error Loading Data",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-vendors")
        .then(function (response) {
          if (response.data.status === 200) {
            const fetchedData = response.data.users.data;
            if (fetchedData.length === 0) {
              // Handle case when there are no records
              setOrdersTableLoading(true); // Set loading to true
              setNoRecordsFound(true); // Set a state variable to indicate no records found
            } else {
              const format = fetchedData.map((item, index) => ({
                edit: (
                  <>
                    <Link to={`/dashboard/vendor/${item.id}`}>
                      <MDBox mt={1} key={item.id}>
                        <button style={myStyle}>
                          <MDButton variant="gradient" color="info">
                            View info
                          </MDButton>
                        </button>
                      </MDBox>
                    </Link>

                    <MDBox mt={1}>
                      <button style={myStyle}>
                        {item.status === "Unconfirmed" ? (
                          <MDButton
                            variant="gradient"
                            color="success"
                            onClick={() => confirmVendor(item.id)}
                            disabled={loadingConfirm}
                          >
                            Confirm
                          </MDButton>
                        ) : (
                          <MDButton
                            variant="gradient"
                            color="warning"
                            onClick={() => unconfirmVendor(item.id)}
                            disabled={loadingUnconfirm}
                          >
                            Unconfirm
                          </MDButton>
                        )}
                      </button>
                    </MDBox>
                  </>
                ),
                number: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {index + 1}
                  </MDTypography>
                ),
                status: (
                  <MDTypography
                    variant="caption"
                    color="text"
                    style={{ color: item.status === "Unconfirmed" ? "red" : "green" }}
                    fontWeight="medium"
                  >
                    {item.status}
                  </MDTypography>
                ),
                firstname: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.firstname}
                  </MDTypography>
                ),
                lastname: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.lastname}
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
                category: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.category}
                  </MDTypography>
                ),
                businessname: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.business_name}
                  </MDTypography>
                ),

                businessdescription: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.business_description.length > MAX_DESCRIPTION_LENGTH
                      ? `${item.business_description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
                      : item.business_description}
                  </MDTypography>
                ),
                state: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.state}
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

  const [anchorEl, setAnchorEl] = useState(null);

  // Open the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {loadingConfirm && <Loader />}
      {loadingUnconfirm && <Loader />}

      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Vendors
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

export default VendorsList;
