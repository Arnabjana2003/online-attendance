import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import services from '../firebase/services';
import {useNavigate, useParams} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "./Button"
function Attendance() {

  const {department,year} = useParams()
  const navigate = useNavigate()
  const students = useSelector(state=>state.student[year]);
  const userData = useSelector(state=>state.auth.authData)
  const [list,setList] = useState([]);

  const onCng = (event,name)=>{
    if(event.checked){
      setList([...list,{name:name,roll:event.value}])
    }else{
      const ele = list.filter(l=>l.roll!=event.value)
      setList(ele)
    }
  }

  const handleSubmit = ()=>{
    if(list.length !== 0){
    //   const teacher = userData.name
      const teacher = "Pankaj Maity"
      console.log({teacher,rollList:[...list]});
    services.takeAttendance(department,year,{teacher,presentedStudents:[...list]})
    .then(()=>{
      toast("Attendance submitted successfully")
      setTimeout(()=>navigate("/dashboard"),1500)
    })
    .catch((err)=>{
      toast(err.message)
    })
    }else{
      toast("No Student Found. Please add students first")
    }
  }

    return (
        <div className=''>
        <ToastContainer/>
        <ul role="list" className=" p-3 divide-y divide-red-200">
          {students && students.map((student) => (
            <li key={student.roll} className="flex justify-evenly gap-x-6 py-5">
              <div className=' md:flex justify-between w-1/3'>
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{student.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">Mrc</p>
                </div>
              </div>
              <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{student.roll}</p>
              </div>
              </div>
              <div className=" flex items-center">
                <label htmlFor={`present ${student.roll}`} className='mr-3'>Present</label>
                <input type='checkBox' id={`present ${student.roll}`} value={student.roll} onChange={(e)=>onCng(e.target,student.name)}/>
              </div>
            </li>
          ))}
        </ul>
        <div className=' text-center'>
          <Button label={"Submit attendance"}onClick={handleSubmit}/>
        </div>
        </div>
      )
}

export default Attendance