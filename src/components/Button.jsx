import React from 'react'

function Button({label,type,onClick,className=""}) {
  return (
    <button type={type} name='btn' className={`px-2 py-1 text-blue-800 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-200 rounded-md shadow-blue-900 shadow-md font-bold ${className}`} onClick={()=>onClick && onClick()}>{label}</button>
  )
}

export default Button