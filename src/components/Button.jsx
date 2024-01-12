import React from 'react'

function Button({label,disabled,type,onClick,className=" bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-200 disabled:text-slate-400 "}) {
  return (
    <button type={type} disabled={disabled} name='btn' className={`text-blue-800 px-2 py-1 rounded-md shadow-blue-900 shadow-md font-bold ${className}`} onClick={()=>onClick && onClick()}>{label}</button>
  )
}

export default Button