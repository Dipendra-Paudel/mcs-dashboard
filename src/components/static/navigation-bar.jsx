import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../../api/auth";
import AlertMessage from "../../common/alertMessage";
import LogoName from "../../common/LogoName";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Navigation = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const [message, setMessage] = useState("");

  const profileDropdown = useRef();
  const [showProfile, setShowProfile] = useState(false);

  const history = useHistory();
  const profileDropdownItems = [
    {
      title: "Logout",
    },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);

    const { status, message } = await logout();
    if (status) {
      window.location = "/";
    } else {
      setMessage(message);
    }
  };

  return (
    <>
      {message && (
        <AlertMessage message={message} handleClose={() => setMessage("")} />
      )}

      <div className="h-24 shadow-lg flex items-center justify-between px-4 md:px-6 lg:px-10 sticky top-0 z-10 w-full bg-white">
        <LogoName />
        <div className="flex items-center space-x-5">
          <button
            className="relative cursor-default flex"
            onBlur={() => setShowProfile(false)}
          >
            <div
              onClick={() => setShowProfile(!showProfile)}
              className="cursor-pointer"
            >
              <PersonOutlineOutlinedIcon />
            </div>
            {showProfile && (
              <div
                className="absolute bg-white right-0 top-11 w-52 rounded overflow-hidden"
                style={{ boxShadow: "0px 0px 10px gray" }}
                ref={profileDropdown}
              >
                {profileDropdownItems.map((item, index) => {
                  const { title, link } = item;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (title === "Logout") {
                          handleLogout();
                        } else {
                          window.scrollTo(0, 0);
                          setShowProfile(false);
                          history.push(link);
                        }
                      }}
                      className="flex items-center space-x-2 px-6 py-2 hover:bg-gray-200 cursor-pointer border-b"
                    >
                      <div>
                        {title !== "Logout"
                          ? title
                          : loggingOut
                          ? "Logging out..."
                          : "Logout"}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
