import React, { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { MdOutlineContentCut } from "react-icons/md";
import { MdOutlineAccessibility } from "react-icons/md";
import { MdOutlineContentPaste } from "react-icons/md";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";
import { MdOutlineContactMail } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { MdSettingsSuggest } from "react-icons/md";
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
      dispatch(setFeature(features.data.data));
    } catch (error) {
      console.error("Error ::>",error);
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
  return (
    <>
      {feature.length === 0 ? (
        <SidebarLoader />
      ) : (
        <ul className="sidebar list-unstyled px-2">
          {feature.map((item, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={item.name.toLowerCase().replace(/\s+/g, "-")}
                  className="text-decoration-none text-dark "
                >
                  <div className="side-nav-item">
                    <span className="side-nav-icon m-auto ">
                      {menus[item.name.replace(/\s+/g, "")]}
                    </span>
                    {props.toggleSidebar && (
                      <span className="side-nav-label m-auto ps-2 ">
                        {item.name}
                      </span>
                    )}
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default Sidebar;
