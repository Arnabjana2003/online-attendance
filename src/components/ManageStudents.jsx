import React, { useEffect, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Student from "./Student";
import services from "../firebase/services";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {firstyear,secondyear,thirdyear,fourthyear,updateStudent,deleteStudent} from "../store/studentSlice"

function ManageStudents() {
  const dispatch = useDispatch()
  const { department, year } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "",
    roll: "",
    registration: "",
  });
  const [editData, setEditData] = useState({});
  const studentsList = useSelector(state=>state.student[year])

  const addStudent = (e) => {
    e.preventDefault();
    setIsSaving(true);
    services
      .addStudent(department, year, studentData)
      .then((dbData) => {
        e.target.name.value = "";
        e.target.roll.value = "";
        e.target.registration.value = "";
        const res = [{ id: dbData.id, ...studentData }, ...students]
        switch(year){
          case "firstyear": dispatch(firstyear(res))
          break;
          case "secondyear": dispatch(secondyear(res))
          break;
          case "thirdyear": dispatch(thirdyear(res))
          break;
          case "fourthyear": dispatch(fourthyear(res))
          break;
        }
        setStudents(res);
        toast(`${studentData.name} is successfully added`);
      })
      .catch((err) => toast(err.message))
      .finally(() => setIsSaving(false));
  };
  const onEdit = async (id, data = {}) => {
    try {
      await services.updateStudents(department, year, id, data);
      dispatch(updateStudent({year,id,data}))
      return true;
    } catch (error) {
      return false;
    }
  };
  const onDelete = async (id) => {
    try {
      await services.deleteStudent(department, year, id);
      dispatch(deleteStudent({year,id}))
      setStudents(students.filter((std) => std.id != id));
      toast("Deleted successfully");
      return true;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    if(studentsList.length != 0){
      setStudents(studentsList)
    }else{
      console.log("calling db");
      services.getStudents(department, year).then((std) => {
        let stdList = [];
        std.forEach((student) => {
          stdList.push({ id: student.id, ...student.data() });
        });
        switch(year){
          case "firstyear": dispatch(firstyear(stdList))
          break;
          case "secondyear": dispatch(secondyear(stdList))
          break;
          case "thirdyear": dispatch(thirdyear(stdList))
          break;
          case "fourthyear": dispatch(fourthyear(stdList))
          break;
        }
        setStudents(stdList);
      });
    }
  }, []);
  return (
    <div className=" p-2">
      <ToastContainer />
      {!modal ? (
        <div className=" pt-2 text-center">
          Want to add new student?{" "}
          <span
            className=" ml-1 font-bold text-yellow-300 p-1 border-2 rounded border-slate-300"
            onClick={() => setModal(true)}
          >
            Add student
          </span>
        </div>
      ) : null}

      {modal ? (
        <Modal>
          <form
            method="POST"
            onSubmit={addStudent}
            className=" w-[17rem] md:w-[20rem]"
          >
            <div className=" mt-2">
              <label htmlFor="name">Student's name: </label>
              <br />
              <input
                name="name"
                id="name"
                className=" w-full p-1 rounded-sm text-slate-800"
                type="text"
                placeholder="name"
                required
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className=" mt-2">
              <label htmlFor="name">Roll no: </label>
              <br />
              <input
                name="roll"
                id="roll"
                className="text-slate-800 w-full p-1 rounded-sm "
                type="text"
                placeholder="B.Sc/XX/XXX"
                required
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className=" mt-2">
              <label htmlFor="name">Registrtion no: </label>
              <br />
              <input
                name="registration"
                id="registration"
                className="text-slate-800 w-full p-1 rounded-sm "
                type="text"
                placeholder="registration number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className=" my-2 text-center">
              <Button
                disabled={isSaving}
                type={"button"}
                label={"Back"}
                onClick={() => setModal(false)}
                className=" mr-4 bg-white hover:bg-slate-300 disabled:text-slate-400"
              />

              <Button disabled={isSaving} type={"submit"} label={"Add"} />
            </div>
          </form>
        </Modal>
      ) : null}

      <main className=" mt-5">
        {students.map((student) => (
          <Student
            key={student.id}
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </main>
    </div>
  );
}

export default ManageStudents;
