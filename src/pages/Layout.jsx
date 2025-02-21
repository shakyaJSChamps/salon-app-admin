import React, { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import Sidebar from "../Component/dashboard/Sidebar";
// import Dlogo from "../assets/image/DLogo.png";
import Logo from "../assets/image/logo-stylex.png"
import Profile from "./Profile";
import { useSelector } from "react-redux";
import LogoLoader from "../Component/LogoLoader";

// const screenHeight = window.innerHeight;
// const mainAreaHeight = screenHeight - 60;
const Layout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [mainAreaHeight, setMainAreaHeight] = useState(0);
  const [loading, setLoading] = useState(true);

  const feature = useSelector((state) => state.feature.value);
  useEffect(() => {
    feature.length > 0 && setLoading(false);
  }, [feature]);

  useEffect(() => {
    const updateMainAreaHeight = () => {
      const screenHeight = window.innerHeight;
      const updatedMainAreaHeight = screenHeight - 60;
      setMainAreaHeight(updatedMainAreaHeight);
    };
    // Call the function on component mount and window resize
    updateMainAreaHeight();
    window.addEventListener("resize", updateMainAreaHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateMainAreaHeight);
    };
  }, []);

  return (
    <>
      <div className="nav d-flex w-100  justify-content-between align-items-center">
        <div className="logo-sec  w-24 d-flex justify-content-center align-items-center">
          <div className="logo ps-1">
            {/* <img src={Dlogo} alt="dlogo.png" /> */}
            <img src={Logo} alt="logo"/>
          </div>
          <div className="ms-4 burger-menu ps-5 ">
            <span
              onClick={() => setToggleSidebar(!toggleSidebar)}
              className="cursor-pointer"
            >
              {toggleSidebar ? <GiHamburgerMenu /> : <IoIosArrowForward />}
            </span>
          </div>
        </div>
        <div className="second-half d-flex justify-content-center align-items-center">
          <Profile />
        </div>
      </div>
      <div
        className="main-area d-flex justify-content-between"
        style={{ height: `${mainAreaHeight}px` }}
      >
        <div
          className={`side-nav ${toggleSidebar ? "w-24" : "w-6"}`}
          // style={{ width: `${toggleSidebar ? "w-24" : "6%"}` }}
        >
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>
        <div
          className={`content px-5 py-3  rounded ${toggleSidebar ? "w-76" : "w-94"} h-100`}
          style={{ width: `${toggleSidebar ? "75%" : "94%"}`, overflow: 'auto' }}
        >
          {loading ? (
            <LogoLoader />
          ) : (
            <Suspense fallback={<div>loading ...</div>}>
              <Outlet />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};
export default Layout;
