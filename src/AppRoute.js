import React, { lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
const UserManagement = lazy(() => import("./page/UserManagement"));
const SalonManagement = lazy(() => import("./page/SalonManagement"));
const FreelanceManagement = lazy(() => import("./page/FreelanceManagement"));
const ServiceTypeMan = lazy(() => import("./page/ServiceTypeMan"));
const CouponManagement = lazy(() => import("./page/CouponManagement"));
const AppointmentMan = lazy(() => import("./page/AppointmentMan"));
const SalesPerson = lazy(() => import("./page/SalesPerson"));
const ADSManagement = lazy(() => import("./page/ADSMangement"));
const PaymentMan = lazy(() => import("./page/PaymentMan"));
const Notification = lazy(() => import("./page/Notification"));
const Setting = lazy(() => import("./page/Settings"));
const Main = lazy(() => import("../src/page/Main"));
const DashBoard = lazy(() => import("../src/page/Dashboard"));
const Login = lazy(() => import("../src/Component/Login"));
const Admin = lazy(() => import("../src/Component/Admin"));
const ForgetPassword = lazy(() => import("../src/Component/ForgetPassword"));
const Verification = lazy(() => import("../src/Component/Verification"));
const NewPassword = lazy(() => import("../src/Component/NewPassword"));
const ChangedPassword = lazy(() => import("../src/Component/ChangedPassword"));
const Error = lazy(() => import("../src/Component/Error"));

const ProtectedRoutes = ({ authToken }) =>{
  return authToken ? <Outlet /> : <Navigate to="/admin/login" />;
}

const AppRoute = (props) => {
  console.log("Props ::>", props);
  const _routes = [
    {
      path: "",
      element: <ProtectedRoutes {...props} />,
      children: [
        {
          path: "",
          element: <Main />,
          children: [
             { path: "dashboard", element: <DashBoard /> },
             { path: "user-management", element: <UserManagement /> },
             { path: "salon-management", element: <SalonManagement /> },
             { path: "freelance-management", element: <FreelanceManagement /> },
             { path: "service-type-management", element: <ServiceTypeMan /> },
             { path: "coupon-management", element: <CouponManagement /> },
             { path: "appointment-management", element: <AppointmentMan /> },
             { path: "sales-person", element: <SalesPerson /> },
             { path: "ads-management", element: <ADSManagement /> },
             { path: "payment-management", element: <PaymentMan /> },
             { path: "notification", element: <Notification /> },
             { path: "setting", element: <Setting /> },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        { path: "login", element: <Login /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "verification", element: <Verification /> },
        { path: "new-password", element: <NewPassword /> },
        { path: "changed-password", element: <ChangedPassword /> },
      ],
    },
    { path: "*", element: <Error /> },
  ];
  const routes = useRoutes(_routes);
  return routes;
};

export default AppRoute;
