import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Protector({children,authentication = true}) {
  const navigate = useNavigate()
  const authStatus = useSelector(state=>state.auth.status)
    useEffect(()=>{
      if(authentication && !authStatus){
        navigate("/login")
      }else if(!authentication && authStatus){
        navigate("/dashboard")
      }
    },[authStatus])
    
  return (
    <div>{children}</div>
  )
}

export default Protector