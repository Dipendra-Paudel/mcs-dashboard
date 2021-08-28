// icons from the material ui (icons)
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

// icons from the svg files
import ProductIcon from "../icons/product-icon";

export default function IconManager({ icon, ...remaining }) {
  const { className } = remaining;
  const commonClass = "w-6 h-6";
  remaining.className = className ? `${commonClass} ${className}` : commonClass;
  if (icon === "Dashboard") {
    return <DashboardIcon {...remaining} />;
  } else if (icon === "Product") {
    return <ProductIcon {...remaining} />;
  } else if (icon === "Settings") {
    return <SettingsOutlinedIcon {...remaining} />;
  } else if (icon === "Profile") {
    return <AccountCircleOutlinedIcon {...remaining} />;
  } else if (icon === "Logout") {
    return <ExitToAppIcon {...remaining} />;
  } else if (icon === "Contact") {
    return <MailOutlineIcon {...remaining} />;
  } else if (icon === "Service") {
    return <SettingsApplicationsIcon {...remaining} />;
  } else if (icon === "Users") {
    return <PeopleOutlineIcon {...remaining} />;
  } else {
    return null;
  }
}
