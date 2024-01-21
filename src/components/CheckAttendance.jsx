import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import services from "../firebase/services";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import Header from "./Header";
import SearchBar from "./SearchBar";

function CheckAttendance() {
  const dispatch = useDispatch()
  const { department, year } = useParams();
  const [list, setList] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBarData,setSearchBarData] = useState([])
  useEffect(() => {
      console.log("calling db");
      services
        .getStudents(department, year)
        .then((std) => {
          let stdList = [];
          std.forEach((student) => {
            stdList.push({ id: student.id, ...student.data() });
          });
          setSearchBarData(stdList)
          setStudents(stdList);
        })
        .catch((err) => toast(err.message))
        .finally(() => setLoading(false));
    services
      .checkAttendance(department, year)
      .then((data) => {
        const prevList = [];
        data.forEach((item) => {
          item.data().presentedStudents.forEach((student) => {
            prevList.push(student.id);
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
      <Header/>
      <div className=" flex justify-end pr-3 mt-2">
      <SearchBar data={searchBarData} setData={setStudents}/>
      </div>
      {!loading?(
        <>
        <ul role="list" className=" p-3 divide-y divide-red-200 text-white">
        <li className="flex justify-evenly gap-x-6 py-5">
          <div className="md:flex justify-between w-1/3 font-bold">
            <h4>Name</h4>
            <h4 className=" hidden md:block">Roll</h4>
          </div>
          <h4 className=" font-bold">Total Attendance</h4>
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
                    <p className="mt-1 truncate text-xs leading-5">
                      Mrc
                    </p>
                  </div>
                </div>
                <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm md:text-md leading-6">{student.roll}</p>
                </div>
              </div>
              <div className=" flex items-center">
                <p className="text-sm md:text-md font-semibold leading-6 ">
                  {list.filter((item) => item == student.id).length}
                </p>
              </div>
            </li>
          ))}
      </ul>
        </>
      ):<Loading/>}
    </>
  );
}

export default CheckAttendance;
