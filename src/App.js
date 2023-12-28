import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "../src/assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const DashBoard = lazy(() => import("../src/page/Dashboard"));
const Login = lazy(() => import("../src/Component/Login"));
const User = lazy(() => import("../src/Component/User"));
const ForgetPassword = lazy(() => import("../src/Component/ForgetPassword"));
const Verification = lazy(() => import("../src/Component/Verification"));
const NewPassword = lazy(() => import("../src/Component/NewPassword"));
const ChangedPassword = lazy(() => import("../src/Component/ChangedPassword"));

const isLoggedIn = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: isLoggedIn ? (
      <Suspense fallback={<div>loading...</div>}>
        <DashBoard />
      </Suspense>
    ) : (
      <Navigate to="/user/login" />
    ),
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
