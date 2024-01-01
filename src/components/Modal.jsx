import React from 'react'
import { useEffect } from 'react'

function Modal({children}) {
    useEffect(()=>{
        document.body.style.overflowY = "hidden"
        return ()=>document.body.style.overflowY = "auto"
    })
  return (
    <div>
        <div className=" fixed top-0 bottom-0 left-0 right-0 bg-slate-300 opacity-50"></div>
      <div className=" fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-2 bg-slate-700 rounded-md ">
      {children}
      </div>
    </div>
  )
}

export default Modal