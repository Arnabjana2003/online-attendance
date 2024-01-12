import { useEffect, useState } from "react";
import authServices from "./firebase/authServices";
import services from "./firebase/services";
import { Outlet } from "react-router-dom";
import Loading from "./components/Loading"
import { useDispatch } from "react-redux";
import {login,logout} from "./store/authSlice"
import { toast } from "react-toastify";



function App() {
  console.log("App is running");
  const [loading,setLaoding] = useState(true)
  const dispatch = useDispatch()
  // const getData = async()=>{
  //   setLaoding(true)
  //   const authData = await authServices.getCurrentUser()
  //   console.log(authData);
  //   if(authData){
  //     dispatch(login(authData))
  //     setLaoding(false)
  //   }else{
  //     dispatch(logout())
  //     setLaoding(false)
  //   }
  // }
  useEffect(()=>{
    setLaoding(true)
    const fn = (data)=>{
      if(data){
        services.search(["members"],["uid","==",data.uid])
        .then((memberData)=>{
          memberData.forEach((member)=>{
            const authData = member.data()
            dispatch(login(authData))
            console.log(authData);
          })
        })
        .catch(err=>{
          alert(err.message)
        })
        .finally(()=>setLaoding(false))
          
      }else{
        dispatch(logout())
        setLaoding(false)
      }
     }
    authServices.getCurrentUser(fn)
    // getData()
  },[]);
  return (
    <div className=" max-w-[100vw] min-h-screen bg-gradient-to-tl to-blue-900 from-blue-400 text-white">
      {!loading?<Outlet/>:<Loading/>}
    </div>
  );
}

export default App;
