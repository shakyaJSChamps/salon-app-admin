import React, { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import LogoLoader from "./Component/LogoLoader";
import Login from "../src/Component/authentication/Login";
const SalesWrapper = lazy(()=>import("./Component/container/SalesWrapper"));
import EditsalonManagement from "./Component/salonManagement/EditDetails/EditsalonManagement";
const CmsSetting = lazy(() => import("./Component/setting/CmsSetting"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const SalonManagement = lazy(() => import("./pages/SalonManagement"));
const SaloonDetails = lazy(() => import("./Component/Saloon/SaloonDetails"));
const FreelanceManagement = lazy(() => import("./pages/FreelanceManagement"));
const ServiceTypeMan = lazy(() => import("./pages/ServiceTypeMan"));
const CouponManagement = lazy(() => import("./pages/CouponManagement"));
const AppointmentMan = lazy(() => import("./pages/AppointmentMan"));
const SalesPerson = lazy(() => import("./pages/SalesPerson"));
const ADSManagement = lazy(() => import("./pages/ADSMangement"));
const PaymentMan = lazy(() => import("./pages/PaymentMan"));
const Notification = lazy(() => import("./pages/Notification"));
const Setting = lazy(() => import("./pages/Settings"));
const Layout = lazy(() => import("../src/pages/Layout"));
const DashBoard = lazy(() => import("../src/pages/Dashboard"));
const SendNotification = lazy(() => import("../src/pages/SendNotification"));
const SalesCreate = lazy(() => import("../src/Component/salesManagement/SalesCreate"));
const ReceiveNotification = lazy(() =>
  import("../src/pages/ReceiveNotification")
);
const Authentication = lazy(() =>
  import("../src/Component/authentication/Authentication")
);
const ForgetPassword = lazy(() =>
  import("../src/Component/authentication/ForgetPassword")
);
const Verification = lazy(() =>
  import("../src/Component/authentication/Verification")
);
const NewPassword = lazy(() =>
  import("../src/Component/authentication/NewPassword")
);
const ChangedPassword = lazy(() =>
  import("../src/Component/authentication/ChangedPassword")
);
const Error = lazy(() => import("../src/Component/Error"));

const ProtectedRoutes = ({ authToken }) => {
  return authToken ? <Layout /> : <Navigate to="/account/login" />;
};
 

const AppRoute = (props) => {
  const _routes = [
    {
      path: "account",
      element: <Authentication />,
      children: [
        { path: "login", element: <Login /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "verification", element: <Verification /> },
        { path: "new-password", element: <NewPassword /> },
        { path: "changed-password", element: <ChangedPassword /> },
      ],
    },
    { path: "", exact: true, element: <Navigate to="/user-management" /> },
    {
      path: "",
      element: <ProtectedRoutes {...props} />,
      children: [
        // Existing routes
        { path: "user-management", element: <UserManagement /> },
        {
          path: "salon-management",
          element: <SalonManagement />,
          children: [{ path: "details", element: <SaloonDetails /> },
          { path: ":userId", element: <EditsalonManagement/> }
          ],

        },
        // { path: "freelance-management", element: <FreelanceManagement /> },
        { path: "service-type-management", element: <ServiceTypeMan /> },
        { path: "coupon-management", element: <CouponManagement /> },
        { path: "appointment-management", element: <AppointmentMan /> },
        { path: "ads-management", element: <ADSManagement /> },
        { path: "payment-management", element: <PaymentMan /> },
        { path: "notifications", element: <Notification /> },
        { path: "setting", element: <Setting /> },
        { path: "setting/cms-setting", element: <CmsSetting /> },
        {
          path: "",
          element: <Notification />,
          children: [
            { path: "receive-notification", element: <ReceiveNotification /> },
            { path: "send-notification", element: <SendNotification /> },
          ],
        },
        {
          path: "sales-person",
          element: <SalesWrapper />,
          children: [
            { path: "", element: <SalesPerson /> }, 
            { path: "creates", element: <SalesCreate /> } 
          ]
        },
        
      ],
    },
    { path: "*", element: <Error /> },
  ];
  const routes = useRoutes(_routes);
  return routes;
};

export default AppRoute;
