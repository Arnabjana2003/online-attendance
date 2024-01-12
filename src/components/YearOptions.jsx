import React, { useState } from 'react'
import Modal from './Modal'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function YearOptions({action,display,propDpt}) {
    const navigate = useNavigate()
    const [year,setYear] = useState("Select")
    const [dpt,setDpt] = useState("Select")
    const onYearCng = (event)=>setYear(event.value)
    const onDptCng = (event)=>setDpt(event.value)
    const handleClick = ()=>{
        if((action || propDpt) && year && year != "Select"){
            switch(action){
                case "manage student": navigate(`/${propDpt}/${year}/students`)
                break;
                case "take attendance": navigate(`/${propDpt}/${year}/attendance`)
                break;
                default:  navigate(`/${propDpt}/${year}/checkattendance`)
            }
        }else if(!action && dpt != "Select" && year && year != "Select"){
            navigate(`/${dpt}/${year}/checkattendance`)
        }else{
            toast("Please select the options")
        }
    }
  return (
    <div>
        <ToastContainer/>
        <Modal>
        <div className='  p-3 w-[250px] max-w-sm bg-gradient-to-tl to-indigo-400 from-blue-900 backdrop-blur-lg flex flex-col items-center rounded-md text-blue-900 mt-2 shadow-lg shadow-indigo-900'>
            <h4 className=' text-lg font-semibold text-white'>To {action?action:"Check Attendance"}</h4>
        {(!action && !propDpt)?(<>
            <h4 className=' text-lg font-semibold text-white'>Choose your department</h4>
        <select className=' w-full mt-3 p-2 rounded-md outline-none' onChange={(e)=>onDptCng(e.target)}>
            <option>Select</option>
            <option value="bca">BCA</option>
            <option value="computerscience">Coumputer Science</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="physics">Physics</option>
            <option value="physics">Physics</option>
        </select>
        </>):null}
        <h4 className=' text-lg font-semibold text-white'>Choose the Year</h4>
        <select className=' w-full mt-3 p-2 rounded-md outline-none' onChange={(e)=>onYearCng(e.target)}>
            <option>Select</option>
            <option value="firstyear">1st year</option>
            <option value="secondyear">2nd year</option>
            <option value="thirdyear">3rd year</option>
            <option value="fourthyear">4th year</option>
        </select>
        <div>
        <button className='mt-3 py-1 px-2 mx-2 rounded-md bg-slate-100' onClick={()=>display(false)}>Cancel</button>
        <button className='mt-3 py-1 px-2 bg-yellow-500 rounded-md' onClick={handleClick}>Done</button>
        </div>
    </div>
        </Modal>
    </div>
  )
}

export default YearOptions