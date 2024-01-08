import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "../src/assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import UserManagement from "./page/UserManagement";
import SalonManagement from "./page/SalonManagement";
import FreelanceManagement from "./page/FreelanceManagement";
import ServiceTypeMan from "./page/ServiceTypeMan";
import CouponManagement from "./page/CouponManagement";
import AppointmentMan from "./page/AppointmentMan";
import SalesPerson from "./page/SalesPerson";
import ADSManagement from "./page/ADSMangement";
import PaymentMan from "./page/PaymentMan";
import Notification from "./page/Notification";
import Setting from "./page/Settings";
import Main from "../src/page/Main";

const DashBoard = lazy(() => import("../src/page/Dashboard"));
const Login = lazy(() => import("../src/Component/Login"));
const User = lazy(() => import("../src/Component/User"));
const ForgetPassword = lazy(() => import("../src/Component/ForgetPassword"));
const Verification = lazy(() => import("../src/Component/Verification"));
const NewPassword = lazy(() => import("../src/Component/NewPassword"));
const ChangedPassword = lazy(() => import("../src/Component/ChangedPassword"));

const isLoggedIn = false;

const router = createBrowserRouter([
  {
    path: "/",
    element: isLoggedIn ? (
      <Suspense fallback={<div>loading...</div>}>
        <Main />
      </Suspense>
    ) : (
      <Navigate to="/user/login" />
    ),
    children: [
      { path: "/", element: <DashBoard /> },
      { path: "/user-management", element: <UserManagement /> },
      { path: "/salon-management", element: <SalonManagement /> },
      { path: "/freelance-management", element: <FreelanceManagement /> },
      { path: "/service-type-management", element: <ServiceTypeMan /> },
      { path: "/coupon-management", element: <CouponManagement /> },
      { path: "/appointment-management", element: <AppointmentMan /> },
      { path: "/sales-person", element: <SalesPerson /> },
      { path: "/ads-management", element: <ADSManagement /> },
      { path: "/payment-management", element: <PaymentMan /> },
      { path: "/notification", element: <Notification /> },
      { path: "/setting", element: <Setting /> },
    ],
  },
  {
    path: "/user",
    element: !isLoggedIn ? (
      <Suspense fallback={<div>loading...</div>}>
        <User />
      </Suspense>
    ) : (
      <Navigate to="/" />
    ),
    children: [
      {
        path: "/user/login",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/user/forget-password",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ForgetPassword />
          </Suspense>
        ),
      },
      {
        path: "/user/verification",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Verification />
          </Suspense>
        ),
      },
      {
        path: "/user/new-password",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <NewPassword />
          </Suspense>
        ),
      },
      {
        path: "/user/changed-password",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ChangedPassword />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
