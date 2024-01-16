import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";
import Logo from "./Logo";
import services from "../firebase/services";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import authServices from "../firebase/authServices";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const onCng = (event) => {
    setUserData({ ...userData, [event.name]: event.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.btn;
    const name = e.target.name;
    const email = e.target.email;
    const password = e.target.passcode;
    const department = e.target.department;
    btn.disabled = true;
    btn.innerText = "Adding...";

    services
      .search([userData.department], ["departmentcode", "!=", "null"])
      .then((dptcode) => {
        let dptCode = null;
        if (dptcode._snapshot.docChanges.length != 0) {

          dptcode.forEach((code) => {
            dptCode = code.data().departmentcode;
          });
          console.log(dptCode);

          if (userData.departmentcode === dptCode) {
            authServices
              .signup(userData.email, userData.passcode)
              .then((data) => {
                services
                  .addMember({
                    uid: data.user.uid,
                    name: userData.name,
                    department: userData.department,
                    email: userData.email,
                  })
                  .then(() => {
                    dispatch(
                      login({
                        uid: data.user.uid,
                        name: userData.name,
                        department: userData.department,
                        email: userData.email,
                      })
                    );
                    toast("Registration succefull");
                    name.value = "";
                    email.value = "";
                    password.value = "";
                    department.value = "";
                  })
                  .catch((err) => {
                    authServices
                      .deleteUser(data.user.uid)
                      .then(() => console.log("user deleted"))
                      .catch((err) => console.log("user deletion err: "), err);
                  });
              })
              .catch((err) => {
                toast(err.message);
              })
              .finally(() => {
                btn.disabled = false;
                btn.innerText = "Signup";
              });
          }else{
            toast("Dopartment code is wrong. Enter the correct code")
          }
        }else{
          authServices
      .signup(userData.email, userData.passcode)
      .then((data) => {
        services.addDocument([userData.department],{departmentcode : userData.departmentcode})
        services.addMember({uid:data.user.uid,name:userData.name,department:userData.department,email:userData.email})
        .then(()=>{
          dispatch(login({uid:data.user.uid,name:userData.name,department:userData.department,email:userData.email}))
          toast("Registration succefull");
          name.value = "";
          email.value = "";
          password.value = "";
          department.value = "";
        })
        .catch((err)=>{
          authServices.deleteUser(data.user.uid).then(()=>console.log("user deleted")).catch((err)=>console.log("user deletion err: "),err)
        })
      })
      .catch((err) => {
        toast(err.message);
      })
      .finally(() => {
        btn.disabled = false;
        btn.innerText = "Signup";
      });
        }
      })
      .catch((err) => toast(err.message))
      .finally(() => {
        btn.disabled = false;
        btn.innerText = "Signup";
      })
      
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
            <h2>Signup</h2>
            <p className="opacity-60 text-base font-normal">or<br/>Existing member ? <span onClick={()=>navigate("/login")} className=" cursor-pointer font-bold">Login here</span></p>
          </div>
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
                  placeholder="email"
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
              <label
                htmlFor="department"
                className="block text-sm font-medium leading-6 text-yellow-200"
              >
                Your Department
              </label>
              <div className="mt-2">
                <select
                  id="department"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 "
                  onChange={(e) => onCng(e.target)}
                  name="department"
                  required
                >
                  <option value="">Select</option>
                  <option value="bca">BCA</option>
                  <option value="mathematics">MATH</option>
                  <option value="geography">GEOGRAPHY</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="departmentcode"
                  className="block text-sm font-medium leading-6 text-yellow-200"
                >
                  Enter the Department Secret Code
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="departmentcode"
                  name="departmentcode"
                  type="text"
                  placeholder="department code"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 "
                  onChange={(e) => onCng(e.target)}
                />
              </div>
            </div>
            <div>
              <Button type={"submit"} label={"Signup"} className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-200 disabled:text-slate-400" />
            </div>
          </form>
        </div>
        <p className=" text-center text-white">Exsiting member ? <span onClick={()=>navigate("/login")} className=" cursor-pointer font-bold">Login here</span></p>
      </div>
    </>
  );
}

export default Signup;
