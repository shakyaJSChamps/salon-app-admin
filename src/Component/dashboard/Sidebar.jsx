import React, { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { MdOutlineContentCut } from "react-icons/md";
import { MdOutlineAccessibility } from "react-icons/md";
import { MdOutlineContentPaste } from "react-icons/md";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { RiBarChartFill, RiFolderReceivedLine } from "react-icons/ri";
import { MdOutlineContactMail } from "react-icons/md";
import { MdSend } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { MdSettingsSuggest } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getFeature } from "../../api/account.api";
import { setFeature } from "../../features/feature";
import Notify from "../../utils/notify";
import SidebarLoader from "./sidebarloader/SidebarLoader";

const Sidebar = (props) => {
  const authToken = useSelector((state) => state.authInfo.token);
  const feature = useSelector((state) => state.feature.value);
  const dispatch = useDispatch();

  const getFeatureList = useCallback(async () => {
    try {
      const features = await getFeature();
      const filteredFeatures = features.data.data.filter(
        (item) =>
          item.name !== "Freelance Management" &&
          item.name !== "Payment Management"
      );

      const notificationsIndex = filteredFeatures.findIndex(
        (item) => item.name === "Notifications"
      );
      const settingsIndex = filteredFeatures.findIndex(
        (item) => item.name === "Setting"
      );

      if (notificationsIndex !== -1) {
        filteredFeatures[notificationsIndex].children =
          notificationsSubmenu.children;
      }
      if (settingsIndex !== -1) {
        filteredFeatures[settingsIndex].children = settingsSubmenu.children;
      }

      console.log("FilteredFeature::::> ", filteredFeatures);
      dispatch(setFeature(filteredFeatures));
    } catch (error) {
      console.error("Error ::>", error);
      Notify.error(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    if (authToken && feature.length === 0) {
      getFeatureList();
    }
  }, [getFeatureList, authToken, feature]);

  const menus = {
    Dashboard: <FaChartPie />,
    UserManagement: <MdOutlineSupervisorAccount />,
    SalonManagement: <MdOutlineContentCut />,
    FreelanceManagement: <MdOutlineAccessibility />,
    ServiceTypeManagement: <MdOutlineContentPaste />,
    CouponManagement: <MdOutlineConfirmationNumber />,
    AppointmentManagement: <MdOutlineSupervisorAccount />,
    SalesPerson: <RiBarChartFill />,
    AdsManagement: <MdOutlineContactMail />,
    PaymentManagement: <MdOutlinePayment />,
    Notifications: <IoMdNotifications />,
    Setting: <MdSettingsSuggest />,
  };

  const notificationsSubmenu = {
    children: [
      {
        name: "Send Notification",
        path: "/send-notification",
        icon: <MdSend />,
      },
      // {
      //   name: "Receive Notification",
      //   path: "/receive-notification",
      //   icon: <RiFolderReceivedLine />,
      // },
    ],
  };

  const settingsSubmenu = {
    children: [
      {
        name: "Manage Sub Admin",
        path: "setting/manage-sub-admin",
        icon: <RiShieldUserLine />,
      },
      {
        name:"Setting",
        path:"/setting",
        icon: <MdSettingsSuggest />,
      },
    ],
  };

  const renderMenuItem = (item, index) => {
    if (item.children) {
      return (
        <li key={index}>
          <div
            className={`side-nav-item ${
              (item.name === "Notifications" || item.name === "Setting") ? "cursor-pointer" : ""
            }`}
            onClick={() => toggleSubMenu(index)}
          >
            <span className="side-nav-icon m-auto">
              {menus[item.name.replace(/\s+/g, "")]}
            </span>
            {props.toggleSidebar && (
              <span className="side-nav-label m-auto ps-2">{item.name}</span>
            )}
          </div>
          {item.isOpen && (
            <ul>
              <div className="submenu-item">
                {item.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <NavLink
                      to={child.path}
                      className="text-decoration-none text-dark "
                    >
                      <div className="side-nav-item">
                        <span className="side-nav-icon m-auto">
                          {child.icon}
                        </span>
                        {props.toggleSidebar && (
                          <span className="side-nav-label m-auto ps-2">
                            {child.name}
                          </span>
                        )}
                      </div>
                    </NavLink>
                  </li>
                ))}
              </div>
            </ul>
          )}
        </li>
      );
    } else {
      return (
        <li key={index}>
          <NavLink
            to={item.name.toLowerCase().replace(/\s+/g, "-")}
            className="text-decoration-none text-dark "
          >
            <div className="side-nav-item">
              <span className="side-nav-icon m-auto">
                {menus[item.name.replace(/\s+/g, "")]}
              </span>
              {props.toggleSidebar && (
                <span className="side-nav-label m-auto ps-2">{item.name}</span>
              )}
            </div>
          </NavLink>
        </li>
      );
    }
  };

  const toggleSubMenu = (index) => {
    const updatedFeature = feature.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isOpen: !item.isOpen,
        };
      }
      // Close other open submenus
      if (item.isOpen && (item.name === "Notifications" || item.name === "Setting")) {
        return {
          ...item,
          isOpen: false,
        };
      }
      return item;
    });
    dispatch(setFeature(updatedFeature));
  };

  return (
    <>
      {feature.length === 0 ? (
        <SidebarLoader />
      ) : (
        <ul className="sidebar list-unstyled px-2">
          {feature.map((item, i) => renderMenuItem(item, i))}
        </ul>
      )}
    </>
  );
};

export default Sidebar;
