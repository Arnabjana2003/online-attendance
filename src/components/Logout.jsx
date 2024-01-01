import React from 'react'
import authSevice from '../firebase/authServices'
import { logout } from '../store/authSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

function Logout({className}) {
  const dispatch = useDispatch();
    const logOut = (e)=>{
      e.target.disabled = true;
        authSevice.logout().then(()=>{
            dispatch(logout())
            location.reload(true)
        }).catch((err)=>toast(err.message))
        .finally(()=>{
          e.target.disabled = false;
        })
    }
  return (
    <div>
      <ToastContainer/>
        <button className={` disabled:opacity-50 ${className}`} onClick={logOut}>Logout</button>
    </div>
  )
}

export default Logout