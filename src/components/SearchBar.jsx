import React from 'react'


function SearchBar({data,setData}) {
    const handleChange = (e)=>{
        let newData = [];
        const searchName = e.target.value
        if(!searchName){
            newData = data
        }else{
            data.forEach((item=>{
                if(item.name.toLowerCase().includes(searchName.toLowerCase())){
                   newData.push(item)
                }
               }))
        }
        
        
        setData(newData)
    }
  return (
    <div>
        <input type='text' placeholder='search by name' className=' outline-none p-1 md:p-2 rounded-md text-blue-700' onChange={(e)=>handleChange(e)}/>
    </div>
  )
}

export default SearchBar