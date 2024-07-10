// Material Dashboard 2 React layouts
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";

const routes2 = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/dashboard/profile",
    component: <Profile />,
  },
];

export default routes2;
