import { Link, NavLink } from "react-router-dom";
import IconManager from "../../common/icon-manager";
import companyLogo from "../../assets/images/logo.svg";

export default function Sidebar({ width, toggled, handleSidebarLinkClick }) {
  let sidebarItems = [
    {
      title: "Dashboard",
      icon: "Dashboard",
      link: "/",
    },
    {
      title: "Product",
      icon: "Product",
      link: "/product",
    },
    {
      title: "Service",
      icon: "Service",
      link: "/service",
    },
    {
      title: "Contacts",
      icon: "Contact",
      link: "/contact",
    },
    {
      title: "Users",
      icon: "Users",
      link: "/users",
    },
    {
      title: "Payments",
      icon: "Payment",
      link: "/payments",
    },
    {
      title: "Change Password",
      link: "/change-password",
      icon: "Password",
    },
  ];

  if (width < 1023) {
    sidebarItems = sidebarItems.concat([
      {
        title: "Profile",
        icon: "Profile",
        link: "/profile",
      },
      {
        title: "Settings",
        icon: "Settings",
        link: "/settings",
      },
      {
        title: "Logout",
        icon: "Logout",
        link: "/logout",
      },
    ]);
  }

  const SidebarContents = () => {
    return (
      <>
        {sidebarItems.map((sidebarItem, index) => {
          const { title, icon, link } = sidebarItem;
          return (
            <NavLink
              to={link}
              key={index}
              onClick={handleSidebarLinkClick}
              className="px-10 flex items-center hover:bg-gray-200 py-2 space-x-2 text-gray-700"
              activeClassName="bg-gray-200"
              exact
            >
              <div>
                <IconManager icon={icon} />
              </div>
              <div>{title}</div>
            </NavLink>
          );
        })}
      </>
    );
  };

  return (
    <>
      {width < 1024 && (
        <div
          id="sidebar"
          className={`overflow-hidden transition-all ease-out duration-300 fixed top-0 lg:top-16 h-screen overflow-y-auto z-20 lg:z-0 bg-white
      ${toggled ? "w-64" : "w-0"}
      `}
        >
          <div className="flex flex-col w-64 py-3 lg:py-5">
            <div className="flex items-center justify-center h-16 mb-2 space-x-2">
              <Link
                to="/"
                className="w-12 h-12 rounded-full overflow-hidden border-gray-400"
              >
                <img
                  src={companyLogo}
                  alt=""
                  className="w-full h-full rounded-full object-cover object-center"
                />
              </Link>
              <Link to="/" className="text-lg font-semibold text-primary">
                Mister Computer Solutions
              </Link>
            </div>
            <SidebarContents />
          </div>
        </div>
      )}
      {width > 1023 && (
        <div
          id="sidebar"
          className={`overflow-hidden pt-5 transition-all ease-out duration-300 fixed top-0 lg:top-16 h-screen overflow-y-auto z-20 lg:z-0 bg-white
      ${toggled ? "w-64" : "w-0"}
      `}
        >
          <div className="flex flex-col w-64 py-3 lg:py-5">
            <SidebarContents />
          </div>
        </div>
      )}
    </>
  );
}
