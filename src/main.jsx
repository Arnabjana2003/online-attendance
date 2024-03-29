import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./Pages/Home.jsx";
import CheckAttendance from "./components/CheckAttendance.jsx";
import Attendance from "./components/Attendance.jsx";
import Protector from "./components/Protector.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import ManageStudents from "./Pages/Students.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element:<Protector authentication={false}><Home/></Protector> },
      {
        path: "/:department/:year/checkattendance",
        element: <CheckAttendance />,
      },
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path: "/:department/:year/attendance",
        element: <Protector authentication={true}><Attendance/></Protector>,
      },
      {
        path: "/:department/dashboard",
        element: <Protector authentication={true}><Dashboard/></Protector>,
      },
      {
        path: "/:department/:year/students",
        element: <Protector authentication={true}><ManageStudents/></Protector>,
      },
      {
        path: "/signup",
        element: <Protector authentication={false}><Signup/></Protector>,
      },
      {
        path: "/login",
        element: <Protector authentication={false}><Login/></Protector>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
