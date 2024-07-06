import React, { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Login from "../src/Component/authentication/Login";
import Dashboard from "../src/pages/Dashboard";
const SalesWrapper = lazy(() => import("./Component/container/SalesWrapper"));
const EditsalonManagement = lazy(() => import("./Component/salonManagement/EditDetails/EditsalonManagement"));
const AccountSetting = lazy(() => import("./Component/setting/AccountSetting"));
const ManageSubAdmin = lazy(() => import("./Component/setting/ManageSubAdmin"));
const CmsSetting = lazy(() => import("./Component/setting/CmsSetting"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const SalonManagement = lazy(() => import("./pages/SalonManagement"));
const SalonDetails = lazy(() => import("./Component/salonManagement/EditDetails/Salondetails/SalonDetails"));
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
const SalesCreate = lazy(() =>
  import("../src/Component/salesManagement/Salescreate/SalesCreate")
);
const ReceiveNotification = lazy(() =>
  import("../src/Component/notification/ReceiveNotification")
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
    { path: "", exact: true, element: <Navigate to="/dashboard" /> },
    {
      path: "",
      element: <ProtectedRoutes {...props} />,
      children: [
        // Existing routes
        { path: "dashboard", element: <Dashboard /> },
        { path: "user-management", element: <UserManagement /> },
        {
          path: "salon-management",
          element: <SalonManagement />,
          children: [
            { path: ":userId", element: <EditsalonManagement /> },
          ],
        },
        // { path: "freelance-management", element: <FreelanceManagement /> },
        { path: "service-type-management", element: <ServiceTypeMan /> },
        { path: "coupon-management", element: <CouponManagement /> },
        { path: "appointment-management", element: <AppointmentMan /> },
        { path: "ads-management", element: <ADSManagement /> },
        { path: "payment-management", element: <PaymentMan /> },
        { path: "notifications", element: <Notification /> },
        {
          path: "",
          element: <Setting />,
          children: [
            { path: "setting", element: <AccountSetting /> },
            { path: "setting/manage-sub-admin", element: <ManageSubAdmin /> },
          ],
        },
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
            { path: "addSalesPerson", element: <SalesCreate /> },
          ],
        },
      ],
    },
    { path: "*", element: <Error /> },
  ];
  const routes = useRoutes(_routes);
  return routes;
};

export default AppRoute;
