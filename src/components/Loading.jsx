import React, { useEffect } from "react";

function Loading() {
    useEffect(()=>{
        document.body.style.overflowY = "hidden"
        return ()=>document.body.style.overflowY = "auto"
    })
  return (
    <>
      <div className=" fixed top-0 bottom-0 left-0 right-0 bg-slate-300 opacity-50"></div>
      <div className=" fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="my-5 animate-bounce">
        <p className=" inline bg-indigo-900 p-2 rounded-full ">Wait</p>
      </div>
      </div>
    </>
  );
}

export default Loading;
