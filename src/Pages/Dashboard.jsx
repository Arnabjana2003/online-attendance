import React, { useEffect, useState } from "react";
import YearOptions from "../components/YearOptions";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "../components/Logout";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import authServices from "../firebase/authServices";
import { login } from "../store/authSlice";

function Dashboard() {
    const {department} = useParams()
  const userData = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [option, setOption] = useState(false);
  const [navSlide, setNavSlide] = useState(false);
  const [userName,setUserName] = useState("");

  const handleClick = (mes) => {
    setOption(mes);
  };

  const dashboardLinks = [
    // {
    //   label: "Add members",
    //   icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //   <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    // </svg>
    // ,
    //   onClick: () => {
    //     setNavSlide((prev) => !prev);
    //     navigate("/add-member");
    //   },
    // },
    {
      label: "Manage students",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
    ,
      onClick: () => {
        setNavSlide((prev) => !prev);
        handleClick("manage student");
      },
    },
    {
      label: "Take attendance",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
    ,
      onClick: () => {
        setNavSlide((prev) => !prev);
        handleClick("take attendance");
      },
    },
  ];
  return (
    <div className=" min-h-screen bg-gradient-to-tl from-slate-200 to-slate-400 text-black">
      <ToastContainer />
      {option?<YearOptions action={option} display={setOption} propDpt={department}/>:null}

      <header className=" flex justify-between p-2 bg-blue-900 shadow-md shadow-indigo-950 text-white text-md sm:text-lg lg:text-xl">
        <Logo />
        <h5 className=" hidden md:block">{userData.name || "User"}</h5>
        <p className=" md:hidden" onClick={() => setNavSlide((prev) => !prev)}>
          {!navSlide ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </p>
      </header>

      <div className=" flex justify-between p-2 pt-5">
        <main className=" w-full">
          <h4 className=" text-center text-lg sm:text-xl font-semibold">
            Hey {userData.name || "User"}
          </h4>
          
        </main>

        <aside
          className={` fixed md:relative ${
            navSlide ? "right-0" : "right-[-300px]"
          } backdrop-blur-md top-12 md:relative md:top-0 md:right-0  border-l p-3 transition-all ease-linear`}
        >
          <div className=" w-60 ">
            <div className=" flex justify-center bg-blue-800 py-3 rounded-md text-yellow-200 font-bold text-xl">
              <h4>Dashboard</h4>
            </div>
            <ul className=" p-2 mt-4">
              {dashboardLinks.map((item) => (
                <li
                  className=" p-2 pl-4 my-3 font-[500] hover:bg-yellow-100  rounded-md flex items-center"
                  key={item.label}
                  onClick={item.onClick}
                >
                  <p className=" mr-5">{item.icon}</p>
                  {item.label}
                </li>
              ))}
              <li className="p-2 pl-4 my-3 font-[500] hover:bg-yellow-100  rounded-md flex items-center">
                <p className=" rotate-180 mr-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>
</p>
                <Logout className="text-red-600" />
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;
