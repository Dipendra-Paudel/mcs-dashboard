import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Product from "./components/product/product";
import Service from "./components/service/service";
import NavigationBar from "./components/static/navigation-bar";
import Sidebar from "./components/static/sidebar";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [toggled, setToggled] = useState(width > 1023 ? true : false);

  const handleWidth = () => {
    const innerWidth = window.innerWidth;

    // Only change width of device is changed from 768px or 1024px
    if (
      (innerWidth < 768 && width > 768) ||
      (innerWidth < 1024 && width > 1023) ||
      (width < 768 && innerWidth > 767) ||
      (width < 1024 && innerWidth > 1023)
    ) {
      setWidth(innerWidth);
    }

    if (width < 1024 && innerWidth > 1023) {
      setToggled(true);
    } else if (width > 1023 && innerWidth < 1024) {
      setToggled(false);
    }
  };

  const handleSidebarLinkClick = () => {
    window.scrollTo(0, 0);
    if (width < 1024) {
      setToggled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  });

  useEffect(() => {
    if (toggled && width < 1024) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
  }, [toggled, width]);

  return (
    <div>
      <NavigationBar
        width={width}
        toggled={toggled}
        handleToggleIconClick={() => setToggled(!toggled)}
      />
      <div className="flex">
        <Sidebar
          width={width}
          toggled={toggled}
          handleSidebarLinkClick={handleSidebarLinkClick}
        />
        <div
          className={`flex-1 bg-gray-100 min-h-screen p-4 md:py-6 md:px-8 transition-all duration-300 text-gray-700 leading-8 ${
            toggled && width > 1023 && "ml-64"
          }`}
        >
          <Switch>
            <Route exact path="/product" component={Product} />
            <Route exact path="/service" component={Service} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;