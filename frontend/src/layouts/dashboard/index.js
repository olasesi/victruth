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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

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
import Projects from "layouts/dashboard/components/Projects";
import ProjectsVendors from "layouts/dashboard/components/ProjectsVendors";

import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
//

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [limoOrder, setLimoOrder] = useState({});
  const [limoOrder30, setLimoOrder30] = useState({});
  const [loading, setLoading] = useState(false);

  const [customerCount, setCustomerCount] = useState({});
  const [customerCount30, setCustomerCount30] = useState({});
  const [loadingCount, setLoadingCount] = useState(false);

  const [revenue, setRevenue] = useState({});
  const [revenue30, setRevenue30] = useState({});
  const [loadingRevenue, setLoadingRevenue] = useState(false);

  const [vendorCount, setVendorCount] = useState({});
  const [vendorCount30, setVendorCount30] = useState({});
  const [loadingVendorCount, setLoadingVendorCount] = useState(false);

  const [dailyOrders, setDailyOrders] = useState({});
  const [dailyLoading, setDailyLoading] = useState(false);
  const [relativeTime, setRelativeTime] = useState("");

  const [monthlyOrders, setMonthlyOrders] = useState({});
  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const [relativeMonthlyTime, setRelativeMonthlyTime] = useState("");

  const [monthlyRevenue, setMonthlyRevenue] = useState({});
  const [monthlyRevenueLoading, setMonthlyRevenueLoading] = useState(false);
  const [relativeMonthlyRevenueTime, setRelativeMonthlyRevenueTime] = useState("");

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/limo-orders")
        .then(function (response) {
          setLoading(false);
          if (response.data.status === 200) {
            setLimoOrder(response.data.orders);
            setLimoOrder30(response.data.orders30);

            setLoading(true);
          }
        })
        .catch(function (error) {
          setLoading(false);

          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });

      await axios
        .get("/api/customers-count")
        .then(function (response) {
          setLoadingCount(false);
          if (response.data.status === 200) {
            setCustomerCount(response.data.customer);
            setCustomerCount30(response.data.customer30);
            setLoadingCount(true);
          }
        })
        .catch(function (error) {
          setLoadingCount(false);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });

      await axios
        .get("/api/revenue")
        .then(function (response) {
          setLoadingRevenue(false);
          if (response.data.status === 200) {
            setRevenue(response.data.revenue);
            setRevenue30(response.data.revenue30);
            setLoadingRevenue(true);
          }
        })
        .catch(function (error) {
          setLoadingRevenue(false);

          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });

      await axios
        .get("/api/vendor-count")
        .then(function (response) {
          setLoadingVendorCount(false);
          if (response.data.status === 200) {
            setVendorCount(response.data.users_vendors);
            setVendorCount30(response.data.vendors30);
            setLoadingVendorCount(true);
          }
        })
        .catch(function (error) {
          setLoadingVendorCount(false);

          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });

      await axios
        .get("/api/show-daily-event-orders")
        .then(function (response) {
          if (response.data.status === 200) {
            // Assuming the response data structure contains an array of daily orders
            const dailyOrdersData = response.data.dailyOrders;
            // Transform the dailyOrdersData into the desired format
            const formattedData = {
              labels: dailyOrdersData.map((item) => item.day_of_week.charAt(0)), // Replace with your actual property name
              datasets: {
                label: "Sales", // Replace with your label
                data: dailyOrdersData.map((item) => item.order_count), // Replace with your actual property name
              },
            };

            setDailyOrders(formattedData);
            setRelativeTime(response.data.relativeTime);
            setDailyLoading(true);
          }
        })
        .catch(function (error) {
          setDailyLoading(true);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });

      await axios
        .get("/api/show-monthly-event-orders")
        .then(function (response) {
          if (response.data.status === 200) {
            // Assuming the response data structure contains an array of daily orders
            const monthlyOrdersData = response.data.monthlyOrders;
            // Transform the monthlyOrdersData into the desired format
            const formattedMonthlyData = {
              labels: monthlyOrdersData.map((item, index) => {
                return item.month_of_year.slice(0, 3);
              }),
              datasets: {
                label: "Sales",
                data: monthlyOrdersData.map((item, index) => {
                  return item.order_count;
                }),
              },
            };

            setMonthlyOrders(formattedMonthlyData);
            setRelativeMonthlyTime(response.data.relativeMonthlyLimoTime);
            setMonthlyLoading(true);
          }
        })
        .catch(function (error) {
          setMonthlyLoading(true);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });

      await axios
        .get("/api/show-monthly-revenue")
        .then(function (response) {
          if (response.data.status === 200) {
            // Assuming the response data structure contains an array of daily orders
            const monthlyRevenueData = response.data.monthlyRevenue;
            // Transform the monthlyRevenueData into the desired format
            const formattedMonthlyRevenueData = {
              labels: monthlyRevenueData.map((item) => item.month_of_year.slice(0, 3)), // Replace with your actual property name
              datasets: {
                label: "Sales", // Replace with your label
                data: monthlyRevenueData.map((item) => item.revenue_count), // Replace with your actual property name
              },
            };

            setMonthlyRevenue(formattedMonthlyRevenueData);
            setRelativeMonthlyRevenueTime(response.data.relativeRevenueTime);
            setMonthlyRevenueLoading(true);
          }
        })
        .catch(function (error) {
          setMonthlyLoading(true);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  }, []);

  // Extract user roles from the token

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="list"
                title="Orders"
                count={loading && limoOrder}
                percentage={{
                  color: "success",
                  amount: loading && limoOrder30,
                  label: "order(s) since 30 days",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Customers"
                count={loadingCount && customerCount}
                percentage={{
                  color: "success",
                  amount: loadingCount && customerCount30,
                  label: "customer(s) since 30 days",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="money"
                title="Revenue"
                count={loadingRevenue && `₦${revenue}`}
                percentage={{
                  color: "success",
                  amount: loadingRevenue && `₦${revenue30}`,
                  label: "revenue since 30 days",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Vendors"
                count={loadingVendorCount && vendorCount}
                percentage={{
                  color: "success",
                  amount: loadingVendorCount && vendorCount30,
                  label: "Vendors since 30 days",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="daily orders"
                  description="Limo service + Other services"
                  date={`Updated ${dailyLoading ? relativeTime : ""}`}
                  chart={dailyLoading && dailyOrders}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="monthly limo service"
                  description="Limo ride service"
                  date={`Updated ${monthlyLoading ? relativeMonthlyTime : ""}`}
                  chart={monthlyLoading && monthlyOrders}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="revenue"
                  description="Revenue from limo service"
                  date={`Updated ${monthlyRevenueLoading ? relativeMonthlyRevenueTime : ""}`}
                  chart={monthlyRevenueLoading && monthlyRevenue}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <ProjectsVendors />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
