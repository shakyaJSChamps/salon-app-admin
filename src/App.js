import {lazy, Suspense} from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import '../src/assets/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashBoard = lazy(() => import("./page/Dashboard"));
const Login = lazy(() => import("../src/Component/Login"));

const isLoggedIn = false;

const router = createBrowserRouter ([
  {
    path: "/",
    element: isLoggedIn ? (
      <Suspense fallback={<div>loading...</div>}>
        <DashBoard />
      </Suspense>
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/login",
    element: !isLoggedIn ? (
      <Suspense fallback={<div>loading...</div>}>
        <Login />
      </Suspense>
    ) : (
      <Navigate to="/" />
    ),
  }
])

export default function App() {
  return (
    <>
     <RouterProvider router={router} /> 
    </>
  )
}
