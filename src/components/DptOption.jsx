import React from 'react'

function DptOption({display,action}) {
    const navigate = useNavigate()
    const [dpt,setDpt] = useState("Select")
    const onDptCng = (event)=>setDpt(event.value)
    const handleClick = ()=>{
        if(dpt && dpt != "Select"){
            switch(action){
                case "login": navigate(`/${dpt}/login`)
                break;
                case signup: navigate(`/${dpt}/signup`)
                break;
            }
        }else{
            toast("Please select your department")
        }
    }
  return (
    <div>
        <ToastContainer/>
        <Modal>
        <div className='  p-3 w-[250px] max-w-sm bg-gradient-to-tl to-indigo-400 from-blue-900 backdrop-blur-lg flex flex-col items-center rounded-md text-blue-900 mt-2 shadow-lg shadow-indigo-900'>
            <h4 className=' text-lg font-semibold text-white'>To {action?action:"Check Attendance"}</h4>
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
        
        <div>
        <button className='mt-3 py-1 px-2 mx-2 rounded-md bg-slate-100' onClick={()=>display(false)}>Cancel</button>
        <button className='mt-3 py-1 px-2 bg-yellow-500 rounded-md' onClick={handleClick}>Done</button>
        </div>
    </div>
        </Modal>
    </div>
  )
}

export default DptOption