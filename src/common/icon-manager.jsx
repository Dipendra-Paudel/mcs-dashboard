// icons from the material ui (icons)
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

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
    return <MiscellaneousServicesIcon {...remaining} />;
  } else if (icon === "Users") {
    return <PeopleOutlineIcon {...remaining} />;
  } else if (icon === "Password") {
    return <LockOutlinedIcon {...remaining} />;
  } else if (icon === "Payment") {
    return <PaymentOutlinedIcon {...remaining} />;
  } else if (icon === "Category") {
    return <CategoryIcon {...remaining} />;
  } else if (icon === "Location") {
    return <LocationOnOutlinedIcon {...remaining} />;
  } else {
    return null;
  }
}
