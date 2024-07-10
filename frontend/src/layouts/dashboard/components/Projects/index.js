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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
//
import Loader from "loader/loader";

function Projects() {
  //const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  //console.log(data());
  //console.log(rows);

  //const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  //const closeMenu = () => setMenu(null);

  // const renderMenu = (
  //   <Menu
  //     id="simple-menu"
  //     anchorEl={menu}
  //     anchorOrigin={{
  //       vertical: "top",
  //       horizontal: "left",
  //     }}
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={Boolean(menu)}
  //     onClose={closeMenu}
  //   >
  //     <MenuItem onClick={closeMenu}>Action</MenuItem>
  //     <MenuItem onClick={closeMenu}>Another action</MenuItem>
  //     <MenuItem onClick={closeMenu}>Something else</MenuItem>
  //   </Menu>
  // );

  //const { columns, rows } = test;
  const [ordersTable, setOrdersTable] = useState({
    columns: [
      { Header: "#", accessor: "number", align: "center" },
      { Header: "Fullname", accessor: "fullname", align: "center" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "Phone", accessor: "phone", align: "center" },
      { Header: "Limo Ride", accessor: "limoride", align: "center" },
      { Header: "Event Planners", accessor: "eventplanners", align: "center" },
      { Header: "Caterers", accessor: "caterers", align: "center" },
      { Header: "Cakes", accessor: "cakes", align: "center" },
      { Header: "Drink Suppliers", accessor: "drinksuppliers", align: "center" },
      { Header: "Servers /Waiters", accessor: "serverswaiters", align: "center" },
      { Header: "Makeup Artists", accessor: "makeupartists", align: "center" },
      { Header: "Venues", accessor: "venues", align: "center" },
      { Header: "Hall Decorators", accessor: "halldecorators", align: "center" },
      { Header: "Photographers /Video", accessor: "photographersvideo", align: "center" },
      { Header: "Aso Ebi", accessor: "asoebi", align: "center" },
      { Header: "Printers", accessor: "printers", align: "center" },
      { Header: "Souvenirs Gifts", accessor: "souvenirsgifts", align: "center" },
      { Header: "Date", accessor: "date", align: "center" },
    ],
    rows: [], // Initially, an empty array for rows
  });

  const [ordersTableLoading, setOrdersTableLoading] = useState(false);
  const [noRecordsFound, setNoRecordsFound] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/all-orders-table")
        .then(function (response) {
          if (response.data.status === 200) {
            const fetchedData = response.data.orderTable.data;
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
                limoride: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.limo_ride === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                eventplanners: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.event_planners === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                caterers: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.caterers === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                cakes: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.cakes === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                drinksuppliers: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.drink_suppliers === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                serverswaiters: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.servers_waiters === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                makeupartists: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.makeup_artists === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                venues: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.venues === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                halldecorators: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.hall_decorators === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                photographersvideo: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.photographers_video === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                asoebi: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.asoebi === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                printers: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.printers === "1" ? "yes" : "-"}
                  </MDTypography>
                ),
                souvenirsgifts: (
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.souvenirs_gifts === "1" ? "yes" : "-"}
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
            title: "An Error Occurred!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  }, []);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            All orders
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox>
        {ordersTableLoading && !noRecordsFound ? (
          // Render your DataTable component here
          <DataTable
            table={ordersTable} // Use your columns and rows data
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
          <Loader /> // Replace LoadingSpinner with your loading component
        )}
      </MDBox>
    </Card>
  );
}

export default Projects;
