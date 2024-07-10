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
//
import { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
//
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// Dashboard components
import CustomersList from "layouts/dashboard/components/CustomersList";
import CustomersOverview from "layouts/dashboard/components/CustomersOverview";
//
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
//
import Loader from "loader/loader";

function Customers() {
  const { sales, tasks } = reportsLineChartData;

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

  const [clickButton, setClickButton] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* {clickButton && <Loader />}
      {!loading && <Loader />} */}
      <DashboardLayout>
        <DashboardNavbar />
        <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
          <AppBar position="static">
            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
              <Tab
                label="Customers"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    people
                  </Icon>
                }
              />
            </Tabs>
          </AppBar>
        </Grid>

        <MDBox pt={6} pb={3}>
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={8}>
                <Card>
                  <CustomersList />
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <CustomersOverview />
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Customers;
