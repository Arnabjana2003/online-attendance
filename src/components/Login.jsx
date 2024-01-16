import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";
import Logo from "./Logo";
import services from "../firebase/services";
import { useDispatch } from "react-redux";
import {login} from "../store/authSlice"
import { useNavigate } from "react-router-dom";
import authServices from "../firebase/authServices";

function Login() {
  const dispatch = useDispatch()
  const navigate  = useNavigate()
  const [userData, setUserData] = useState({});
  const onCng = (event) => {
    setUserData({ ...userData, [event.name]: event.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.btn;
    const email = e.target.email;
    const password = e.target.passcode;
    btn.disabled = true;
    btn.innerText = "Logging in...";
    authServices
      .login(userData.email, userData.passcode)
      .then((data) => {
        services.search(["members"],["uid","==",data.user.uid])
        .then((userData)=>{
            userData.forEach((user)=>{
                const authData = user.data()
            dispatch(login(authData))
            console.log(authData);
            email.value = "";
            password.value = ""
            })
        })
        .catch((err)=>alert(err.message))
      })
      .catch((err) => {
        toast(err.message);
      })
      .finally(() => {
        btn.disabled = false;
        btn.innerText = "Login";
      });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <ToastContainer position="top-center" />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className=" text-center">
            <Logo
              span=" font-extrabold text-2xl md:text-3xl text-yellow-300"
              className=" font-bold text-xl md:text-2xl text-white"
            />
          </div>
          <div className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-200">
            <h2>Login to your account</h2>
            <p className="  opacity-60 text-base font-normal">or<br/>Existing member ? <span onClick={()=>navigate("/signup")} className=" cursor-pointer font-bold">Login here</span></p>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-yellow-200"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 "
                  onChange={(e) => onCng(e.target)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="passcode"
                  className="block text-sm font-medium leading-6 text-yellow-200"
                >
                  Set a Passcode
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passcode"
                  name="passcode"
                  type="password"
                  placeholder="min 8 characters"
                  autoComplete="current-password"
                  minLength={8}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 "
                  onChange={(e) => onCng(e.target)}
                />
              </div>
            </div>

            <div>
              <Button type={"submit"} label={"Log in"} className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-200 disabled:text-slate-400" />
            </div>
          </form>
        </div>
        <p className=" text-center text-base font-normal">Existing member ? <span onClick={()=>navigate("/signup")} className=" cursor-pointer font-bold">Login here</span></p>
      </div>
    </>
  );
}

export default Login;
