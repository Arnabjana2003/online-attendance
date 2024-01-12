import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Logout from './Logout'
import Logo from './Logo'

function Header() {
    const navigate = useNavigate()
    const auth = useSelector(state=>state.auth)
  return (
    <div>
        <header className=' flex justify-between p-2 items-center bg-blue-900 shadow-md shadow-indigo-950 text-white text-md sm:text-lg lg:text-xl'>
            <Logo/>
            <nav className=' flex w-[80%] justify-end'>
                {!auth.status?(
                    <Link to="/login" className=' border border-yellow-300 px-2 rounded-md'>
                    Teacher's Login
                    </Link>
                ):(<>
                <div className=' mr-3 md:mr-10 border border-yellow-300 px-2 rounded-md'><Logout/></div>
                <p className=' px-2 rounded-md hover:bg-yellow-300 hover:text-blue-900' onClick={()=>navigate(`/${auth.authData.department}/dashboard`)}>Dashboard</p>
                </>)}
            </nav>
        </header>
    </div>
  )
}

export default Header