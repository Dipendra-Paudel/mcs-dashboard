import { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import IconManager from "../../common/icon-manager";

export default function NavigationBar({
  width,
  handleToggleIconClick,
  toggled,
}) {
  const history = useHistory();
  const profileDropdownItems = [
    {
      icon: "Profile",
      title: "Profile",
      link: "/profile",
    },
    {
      icon: "Settings",
      title: "Settings",
      link: "/settings",
    },
    {
      icon: "Logout",
      title: "Logout",
      link: "/logout",
    },
  ];

  const profileDropdown = useRef();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="h-16 shadow-lg flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 w-full bg-white">
      <div className="flex items-center space-x-28 pl-6">
        <div className="flex items-center">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1703.2 603.28"
              className="w-24"
            >
              <defs></defs>
              <g id="Layer_2" data-name="Layer 2">
                <path
                  className="cls-1"
                  d="M1165.94,983.27l71-84.47s-186.67-223.84-416.42-38c0,0,25.34,32.1,25.34,77.71v98S935.34,762.81,1165.94,983.27Z"
                  transform="translate(-174.8 -786.35)"
                />
                <path
                  className="cls-1"
                  d="M847.5,1136.15V1335.4s204.41,170.72,449.37-114.78l141.9-175.69s43.92,69.26,150.35,86.15l96.29,23.65s60.82,18.59,62.51,62.51c0,0,1.69,54.06-86.16,57.44,0,0-76,15.2-165.55-81.09l-72.64,89.53s99.67,109.81,233.13,106.43c0,0,199.34,6.76,212.85-179.07,0,0,18.59-148.66-214.54-179.07,0,0-113.19-15.2-113.19-69.26,0,0,13.51-64.2,106.43-62.51,0,0,89.53-13.51,143.59,82.78l86.16-76s-72.64-114.87-221.3-119.94c0,0-82.78-5.07-168.94,55.75L1432,887.82s-91.22,87.84-148.66,175.69l-85.49,98.83S964.06,1441.92,847.5,1136.15Z"
                  transform="translate(-174.8 -786.35)"
                />
                <path
                  className="cls-2"
                  d="M551.52,999.31s3.38-74.33,76-77.71c0,0,64.2-1.68,77.71,74.34l.42,158.25c7.24,34,32.66,118.09,112.27,161.88l2.53,2.93V982.42S808.3,798.28,627.54,794.9c0,0-82.58-1.68-129.91,57.23C450.3,793.22,367.72,794.9,367.72,794.9,187,798.28,174.8,982.42,174.8,982.42v337c3,58.28,57.78,60,57.78,60,60.81-6.76,56.59-60,56.59-60L290,995.94c13.52-76,77.71-74.34,77.71-74.34,72.65,3.38,76,77.71,76,77.71v332.81c3.22,38.69,49.49,46.6,53.71,47.25v.05l.17,0,.17,0v-.05c4.23-.65,50.5-8.56,53.72-47.25Z"
                  transform="translate(-174.8 -786.35)"
                />
              </g>
              <g id="Layer_1" data-name="Layer 1">
                <rect
                  className="cls-2"
                  x="838.4"
                  y="180.86"
                  width="30.13"
                  height="120.53"
                  rx="4.5"
                />
                <path
                  className="cls-2"
                  d="M1065.24,992.63v.31a12.36,12.36,0,0,0,6.84,11,95.8,95.8,0,0,1,51.6,93.75c-4.3,48.46-45.2,86.55-93.85,87.25a95.82,95.82,0,0,1-45.3-181.05A12.21,12.21,0,0,0,991.28,993v-.66a12,12,0,0,0-17.34-10.86,120.49,120.49,0,0,0-66.08,113.29c2.86,62,53.56,112.34,115.63,114.74a120.53,120.53,0,0,0,59.71-227.71A12.25,12.25,0,0,0,1065.24,992.63Z"
                  transform="translate(-174.8 -786.35)"
                />
              </g>
            </svg>
          </Link>
        </div>
        {width > 767 && (
          <div>
            <MenuIcon onClick={handleToggleIconClick} />
          </div>
        )}
      </div>
      {toggled && width < 1024 && (
        <div
          className="fixed w-full h-screen left-0 top-0 bg-black opacity-50 z-10"
          onClick={handleToggleIconClick}
        ></div>
      )}
      <div className="flex items-center space-x-5">
        {width > 767 && (
          <>
            <button
              className="relative cursor-default flex"
              onBlur={() => setShowProfile(false)}
            >
              <IconManager
                icon="Profile"
                onClick={() => setShowProfile(!showProfile)}
              />
              {showProfile && (
                <div
                  className="absolute bg-white right-0 top-11 py-2 w-40 rounded"
                  style={{ boxShadow: "0px 0px 10px gray" }}
                  ref={profileDropdown}
                >
                  {profileDropdownItems.map((item, index) => {
                    const { icon, title, link } = item;
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          setShowProfile(false);
                          history.push(link);
                        }}
                        className="flex items-center space-x-2 px-6 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        <div>
                          <IconManager
                            icon={icon}
                            style={{ fontSize: "20px" }}
                          />
                        </div>
                        <div>{title}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </button>
          </>
        )}
        {width < 768 && (
          <div>
            <MenuIcon onClick={handleToggleIconClick} />
          </div>
        )}
      </div>
    </div>
  );
}
