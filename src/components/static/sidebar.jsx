import { Link, NavLink } from "react-router-dom";
import IconManager from "../../common/icon-manager";
import companyLogo from "../../assets/images/logo.svg";

export default function Sidebar({
  width,
  toggled,
  handleSidebarLinkClick,
  handleClose,
}) {
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
      title: "Product Category",
      icon: "Category",
      link: "/product-category",
    },
    {
      title: "Service",
      icon: "Service",
      link: "/service",
    },
    {
      title: "Delivery Locations",
      icon: "Location",
      link: "/delivery-locations",
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
              className="px-10 flex items-center py-2 space-x-2 text-gray-700"
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
    <div>
      {width < 1024 && (
        <>
          <div
            id="sidebar"
            className={`overflow-hidden transition-all ease-out duration-300 fixed top-0 lg:top-16 h-screen overflow-y-auto z-30 lg:z-0 bg-white
      ${toggled ? "w-64" : "w-0"}
      `}
          >
            <div className="flex flex-col w-64 py-3 lg:py-5">
              <div className="flex items-center px-10 h-16 mb-2 space-x-2 border-b border-gray-300">
                <Link to="/">
                  <img
                    src={companyLogo}
                    alt=""
                    className="h-10 w-auto object-cover object-center"
                  />
                </Link>
              </div>
              <SidebarContents />
            </div>
          </div>

          {toggled && (
            <div
              className="fixed z-20 top-0 left-0 w-screen min-h-screen h-screen bg-black bg-opacity-50"
              onClick={handleClose}
            ></div>
          )}
        </>
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
    </div>
  );
}
