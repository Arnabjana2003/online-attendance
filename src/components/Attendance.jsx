import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import services from "../firebase/services";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";
import Loading from "./Loading"
import Header from "./Header"
import {
  firstyear,
  secondyear,
  thirdyear,
  fourthyear,
} from "../store/studentSlice";

function Attendance() {
  const { department, year } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.authData);
  const [list, setList] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading,setLoading] = useState(true)

  const studentsList = useSelector((state) => state.student[year]);

  useEffect(() => {
    if (studentsList.length != 0) {
      setStudents(studentsList);
      setLoading(false)
    } else {
      console.log("calling db");
      services
      .getStudents(department, year)
      .then((std) => {
        let stdList = [];
        std.forEach((student) => {
          stdList.push({ id: student.id, ...student.data() });
        });
        switch (year) {
          case "firstyear":
            dispatch(firstyear(stdList));
            break;
            case "secondyear":
              dispatch(secondyear(stdList));
              break;
              case "thirdyear":
                dispatch(thirdyear(stdList));
                break;
                case "fourthyear":
                  dispatch(fourthyear(stdList));
                  break;
                }
                setStudents(stdList);
              })
              .catch((err) => toast(err.message))
              .finally(()=>setLoading(false))
            }
  }, []);

  const onCng = (event, name,id) => {
    if (event.checked) {
      setList([...list, { name: name, roll: event.value, id:id }]);
    } else {
      const ele = list.filter((l) => l.roll != event.value);
      setList(ele);
    }
  };

  const handleSubmit = () => {
    if (list.length !== 0) {
      const teacher = userData.name;
      services
        .takeAttendance(department, year, {
          teacher,
          presentedStudents: [...list],
        })
        .then(() => {
          toast("Attendance submitted successfully");
          setTimeout(() => navigate(`/${department}/dashboard`), 1500);
        })
        .catch((err) => {
          toast(err.message);
        });
    } else {
      toast("No Student Found. Please add students first");
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <Header/>
      {!loading?(
        <>
        <ul role="list" className=" p-3 divide-y divide-red-200 text-white">
        {students &&
          students.map((student) => (
            <li key={student.roll} className="flex justify-evenly gap-x-6 py-5">
              <div className=" md:flex justify-between w-1/3">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 ">
                      {student.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5">
                      Mrc
                    </p>
                  </div>
                </div>
                <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6">
                    {student.roll}
                  </p>
                </div>
              </div>
              <div className=" flex items-center">
                <label htmlFor={`present ${student.roll}`} className="mr-3">
                  Present
                </label>
                <input
                  type="checkBox"
                  id={`present ${student.roll}`}
                  value={student.roll}
                  onChange={(e) => onCng(e.target, student.name,student.id)}
                />
              </div>
            </li>
          ))}
      </ul>
      <div className=" text-center">
        <Button label={"Submit attendance"} onClick={handleSubmit} />
      </div></>
      ):<Loading/>}
    </div>
  );
}

export default Attendance;
