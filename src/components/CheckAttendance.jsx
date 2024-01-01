import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import services from "../firebase/services";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckAttendance() {
  const { department, year } = useParams();
  const [list, setList] = useState([]);
  const students = useSelector((state) => state.student[`${year}`]);
  useEffect(() => {
    services
      .checkAttendance(department, year)
      .then((data) => {
          const prevList = [];
          data.forEach((item) => {
            item.data().presentedStudents.forEach((student) => {
              prevList.push(student.roll);
            });
          });
          setList(prevList);
      })
      .catch((err) => {
        toast(err.message);
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <ul role="list" className=" p-3 divide-y divide-red-200">
        <li className="flex justify-evenly gap-x-6 py-5">
          <div className="md:flex justify-between w-1/3 font-bold text-blue-900">
            <h4>Name</h4>
            <h4 className=" hidden md:block">Roll</h4>
          </div>
          <h4 className=" font-bold text-blue-900">Total Attendance</h4>
        </li>
        {students &&
          students.map((student) => (
            <li
              key={student.roll}
              className="flex md:justify-evenly justify-around gap-x-6 py-5"
            >
              <div className=" md:flex justify-between w-1/3">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm md:text-md font-semibold leading-6">
                      {student.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                      Mrc
                    </p>
                  </div>
                </div>
                <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm md:text-md leading-6">{student.roll}</p>
                </div>
              </div>
              <div className=" flex items-center">
                <p className="text-sm md:text-md font-semibold leading-6 text-gray-900">
                  {list.filter((item) => item == student.roll).length}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default CheckAttendance;
