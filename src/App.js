import { lazy, Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "../src/assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
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

const isLoggedIn = localStorage.getItem("token");


const router = createBrowserRouter([
  {
    path: "/",
    element: isLoggedIn ? (
      <Suspense fallback={<div>loading...</div>}>
        <Main />
      </Suspense>
    ) : (
      <Navigate to="/admin/login" />
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <DashBoard />{" "}
          </Suspense>
        ),
      },
      {
        path: "/user-management",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <UserManagement />{" "}
          </Suspense>
        ),
      },
      {
        path: "/salon-management",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <SalonManagement />{" "}
          </Suspense>
        ),
      },
      {
        path: "/freelance-management",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <FreelanceManagement />{" "}
          </Suspense>
        ),
      },
      {
        path: "/service-type-management",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <ServiceTypeMan />{" "}
          </Suspense>
        ),
      },
      {
        path: "/coupon-management",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <CouponManagement />{" "}
          </Suspense>
        ),
      },
      {
        path: "/appointment-management",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <AppointmentMan />{" "}
          </Suspense>
        ),
      },
      {
        path: "/sales-person",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <SalesPerson />{" "}
          </Suspense>
        ),
      },
      {
        path: "/ads-management",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <ADSManagement />{" "}
          </Suspense>
        ),
      },
      {
        path: "/payment-management",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <PaymentMan />{" "}
          </Suspense>
        ),
      },
      {
        path: "/notification",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <Notification />{" "}
          </Suspense>
        ),
      },
      {
        path: "/setting",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            {" "}
            <Setting />{" "}
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: !isLoggedIn ? (
      <Suspense fallback={<div>loading...</div>}>
        <Admin />
      </Suspense>
    ) : (
      <Navigate to="/" />
    ),
    children: [
      {
        path: "/admin/login",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/admin/forget-password",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ForgetPassword />
          </Suspense>
        ),
      },
      {
        path: "/admin/verification",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Verification />
          </Suspense>
        ),
      },
      {
        path: "/admin/new-password",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <NewPassword />
          </Suspense>
        ),
      },
      {
        path: "/admin/changed-password",
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
  useEffect(() => {
    console.log("");
  }, [isLoggedIn])
  
  return <RouterProvider router={router} />;
}
