import React from "react";
import { useNavigate } from "react-router-dom";

function Logo({
  span = "  font-semibold text-xl md:text-2xl text-yellow-300"
  ,className}) {
    const navigate = useNavigate()
  return (
    <div onClick={()=>navigate("/")}>
      <h4 className={` font-sans md:text-xl ${className}`} onClick={() => navigate("/")}>
        <span className={span}>A</span>
        ttendance
      </h4>
    </div>
  );
}

export default Logo;
