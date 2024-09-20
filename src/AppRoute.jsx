import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../src/Component/authentication/Login";
import Dashboard from "../src/pages/Dashboard";
import UpdateSalesDetails from "./Component/salesManagement/updateSalesDetails/UpdateSalesDetails";
const SalesWrapper = lazy(() => import("./Component/container/SalesWrapper"));
const EditsalonManagement = lazy(() => import("./Component/salonManagement/EditDetails/EditsalonManagement"));
const AccountSetting = lazy(() => import("./Component/setting/AccountSetting"));
const ManageSubAdmin = lazy(() => import("./Component/setting/ManageSubAdmin"));
const CmsSetting = lazy(() => import("./Component/setting/CmsSetting"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const SalonManagement = lazy(() => import("./pages/SalonManagement"));
const ServiceTypeMan = lazy(() => import("./pages/ServiceTypeMan"));
const CouponManagement = lazy(() => import("./pages/CouponManagement"));
const SalesPerson = lazy(() => import("./pages/SalesPerson"));
const ADSManagement = lazy(() => import("./pages/ADSMangement"));
const Setting = lazy(() => import("./pages/Settings"));
const Layout = lazy(() => import("../src/pages/Layout"));
const SalesCreate = lazy(() =>
  import("../src/Component/salesManagement/Salescreate/SalesCreate")
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
  return authToken ? <Layout /> : <Navigate to="account/login" />;
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
        { path: "dashboard", element: <Dashboard /> },
        { path: "user-management", element: <UserManagement /> },
        {
          path: "salon-management",
          element: <SalonManagement />,
          children: [
            { path: ":salonId", element: <EditsalonManagement /> },
          ],
        },
        { path: "service-type-management", element: <ServiceTypeMan /> },
        { path: "coupon-management", element: <CouponManagement /> },
        { path: "ads-management", element: <ADSManagement /> },
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
          path: "sales-person",
          element: <SalesWrapper />,
          children: [
            {
              path: "",
              element: <SalesPerson />,
              children: [
                { path: ":salesId", element: <UpdateSalesDetails /> }
              ]
            },
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




