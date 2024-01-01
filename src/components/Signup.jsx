import React, { useState } from "react";
import authSevice from "../firebase/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";
import Logo from "./Logo";

function Signup() {
  const [userData, setUserData] = useState({});
  const onCng = (event) => {
    setUserData({ ...userData, [event.name]: event.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.btn;
    const name = e.target.name;
    const email = e.target.email;
    const password = e.target.password;
    const department = e.target.department;
    btn.disabled = false;
    btn.innerText = "Adding...";
    authSevice
      .signup(userData.email, userData.email, userData.name)
      .then(() => {
        toast("Member added");
        name.value = "";
        email.value = "";
        password.value = "";
        department.value = "";
      })
      .catch((err) => {
        toast(err.message);
      })
      .finally(() => {
        btn.disabled = false;
        btn.innerText = "Add";
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-200">
            Add new member
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-yellow-200"
              >
                Your name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder=" name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 "
                  onChange={(e) => onCng(e.target)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium leading-6 text-yellow-200"
              >
                Your Department
              </label>
              <div className="mt-2">
                
                <select id="department" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 " onChange={(e) => onCng(e.target)} name="department" required>
                    <option value="">Select</option>
                    <option value="bca">BCA</option>
                    <option value="math">MATH</option>
                    <option value="geography">GEOGRAPHY</option>
                </select>
              </div>
            </div>
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
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 "
                  onChange={(e) => onCng(e.target)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-yellow-200"
                >
                  Set a Passcode
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
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
              <Button type={"submit"} label={"Log in"} className="w-full" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
