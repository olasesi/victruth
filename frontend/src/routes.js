// Material Dashboard 2 React layouts
import { useState, useEffect } from "react";
import Dashboard from "layouts/dashboard";
import Appearance from "layouts/appearance";
import SocialMedia from "layouts/social";
import Settings from "layouts/settings";
import Vendors from "layouts/vendors";
import Orders from "layouts/orders";
import Customers from "layouts/customers";

//js-cookie
import Cookies from "js-cookie";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customers",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/dashboard/customers",
    component: <Customers />,
  },

  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/dashboard/orders",
    component: <Orders />,
  },
  {
    type: "collapse",
    name: "Vendors",
    key: "vendors",
    icon: <Icon fontSize="small">business</Icon>,
    route: "/dashboard/vendors",
    component: <Vendors />,
  },

  {
    type: "collapse",
    name: "Appearance",
    key: "appearance",
    icon: <Icon fontSize="small">monitor</Icon>,
    route: "/dashboard/appearance",
    component: <Appearance />,
  },
  {
    type: "collapse",
    name: "Social Media",
    key: "social",
    icon: <Icon fontSize="small">tag</Icon>,
    route: "/dashboard/social-media",
    component: <SocialMedia />,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "setting",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/dashboard/setting",
    component: <Settings />,
  },
];

export default routes;
