import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
import Button from "./Button";

function Student({student, onEdit, onDelete }) {
  const [isEditable, setIsEditable] = useState(false);
  const [studentData, setStudentData] = useState({ ...student });
  const [showModal, setShowModal] = useState(false);

  const Edit = async () => {
    if (isEditable) {
      setShowModal("Update student")
    } else {
      setIsEditable(true);
    }
  };
  const onCancel = ()=>{
    if(showModal === "Update student"){
        setStudentData(student);
        setIsEditable(false);
    }
    setShowModal(false)
  }
  const Update = async ()=>{
    const res = await onEdit(studentData.id, studentData);
      if (res) {
        alert("Success");
        setIsEditable(false);
        setShowModal(false)
    } else {
        setStudentData(student);
        setIsEditable(false);
        setShowModal(false)
        toast("updation error");
      }
  }
  const Delete = async ()=>{
    await onDelete(studentData.id)
    setShowModal(false)
  }
  const handleClick = ()=>{
    switch(showModal){
        case "Update student" : Update()
        break;
        case "Delete student" : Delete()
        break;
    }
  }
  return (
    <div className=" flex justify-evenly bg-gradient-to-tl to-blue-400 from-blue-800 p-2 rounded-md my-5">
      <ToastContainer />
      {showModal ? (
        <Modal>
          <p>Do you really want to {showModal}?</p>
          <div>
            <Button
              className=" bg-white hover:bg-slate-300 disabled:text-slate-400"
              label={"No"}
              onClick={onCancel}
              />
            <Button
              className=" bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-200 disabled:text-slate-400"
              label={showModal}
              onClick={handleClick}
            />
          </div>
        </Modal>
      ) : null}
      <div className="sm:flex justify-between w-[85%]">
        <input
          type="text"
          name="name"
          placeholder="student's name"
          value={studentData.name}
          className={`font-medium ${
            !isEditable
              ? "bg-transparent"
              : "text-black rounded-md bg-slate-300"
          } pl-2 outline-none`}
          readOnly={!isEditable}
          onChange={(e) =>
            setStudentData({ ...studentData, [e.target.name]: e.target.value })
          }
        />

        <input
          type="text"
          name="roll"
          placeholder="roll number"
          value={studentData.roll}
          className={`${
            !isEditable
              ? "bg-transparent"
              : "text-black rounded-md bg-slate-300"
          } pl-2 outline-none`}
          readOnly={!isEditable}
          onChange={(e) =>
            setStudentData({ ...studentData, [e.target.name]: e.target.value })
          }
        />

        <input
          type="text"
          name="registration"
          placeholder="registration number"
          value={studentData.registration}
          className={`${
            !isEditable
              ? "bg-transparent"
              : "text-black rounded-md bg-slate-300"
          } pl-2 outline-none`}
          readOnly={!isEditable}
          onChange={(e) =>
            setStudentData({ ...studentData, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="">
        <button
          type="submit"
          onClick={Edit}
          className=" bg-green-600 rounded p-1 mx-2 mt-2"
        >
          {isEditable ? "Update" : "Edit"}
        </button>

        <button type="button" className=" bg-red-600 rounded p-1 mx-2 mt-2"
        onClick={()=>setShowModal("Delete student")}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Student;
