import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Protector({children,authentication = true}) {
  const navigate = useNavigate()
  const auth = useSelector(state=>state.auth)
    useEffect(()=>{
      if(authentication && !auth.status){
        navigate("/login")
      }else if(!authentication && auth.status){
        navigate(`/${auth.authData.department}/dashboard`)
      }
    },[auth])
    
  return (
    <div>{children}</div>
  )
}

export default Protector