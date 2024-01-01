import { useState } from "react";
import authServices from "./firebase/authServices";
import services from "./firebase/services";
import { Outlet } from "react-router-dom";
import Loading from "./components/Loading"
import { useDispatch } from "react-redux";
import {login,logout} from "./store/authSlice"



function App() {
  console.log("App is running");
  const [loading,setLaoding] = useState(false)
  const dispatch = useDispatch()
  const getData = async()=>{
    setLaoding(true)
    const authData = await authServices.getCurrentUser()
    if(authData){
      dispatch(login(authData))
      setLaoding(false)
    }else{
      dispatch(logout())
      setLaoding(false)
    }
  }
  return (
    <div className=" w-full min-h-screen bg-gradient-to-tl to-blue-900 from-blue-400 text-white">
      {!loading?<Outlet/>:<Loading/>}
    </div>
  );
}

export default App;
