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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/:department/:year/checkattendance",
        element: <CheckAttendance />,
      },
      {
        path: "/:department/:year/attendance",
        element: <Protector authentication={false}><Attendance/></Protector>,
      },
      {
        path: "/:department/dashboard",
        element: <Protector authentication={false}><Dashboard/></Protector>,
      },
      {
        path: "/signup",
        element: <Protector authentication={false}><Signup/></Protector>,
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
