import { AiFillCheckCircle } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import {  useLayoutEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classNames from "classnames/bind";
import styles from "./approval.module.scss";
import SelectForm from "../../SelectForm";
import StyledTableCell from "../../StyledTableCell";
import { ApiTeachingVolume } from "../../../apis/axios";
import FormSubject from "../../Form/sub";
import { GrClear } from "react-icons/gr";
import React, { Component }  from 'react';

const cx = classNames.bind(styles);

function Approval() {
  const [continues, setContinues] = useState(false);
  const [dataApproval, setDataApproval] = useState([]);
  const [approvalID, setApprovalID] = useState({});
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
  const [formsmount, setFormsmount] = useState(false);
  const [approvalForm,setApprovalForm] = useState({theoryClass:[],exams:[],others:[]})
  
  const opt = [
    { value: "2022", label: "2021-2022" },
    { value: "2023", label: "2022-2023" },
    { value: "2024", label: "2024-2025" },
  ];
  const hocki = [
    { value: "1", label: "Học Kỳ I" },
    { value: "2", label: "Học Kỳ II" },
    { value: "Hè", label: "Học Hè" },
  ];
  function data(id) {
    console.log(id);
    if (semester && year && semester.value && year.value) {
      ApiTeachingVolume.Get(
        `volume/selfTotalDetail/idLecture/${id.id}/sem/${semester.value}/year/${year.value}`
      ).then((req) => {
        const theory = req.grades.map((e, index) => {
          return {
            stt: index + 1,
            letter: e.Letter,
            numbercode: e.Number,
            subject: e.SubjectName,
            type: e.Type,
            semester: e.Semester,
            time: e.Time,
            unit: e.Unit,
            numberGE: e.NumberGE,
            coefficient: e.CoefficientGradeExam,
            coefficientGrade: e.CoefficientGradeExam,
            idSubject: e.IdSubject,
          };
        });
        const exam = req.exams.map((e, index) => {
          return {
            stt: index + 1,
            letter: e.Letter,
            numbercode: e.Number,
            subject: e.SubjectName,
            type: e.Type,
            semester: e.Semester,
            time: e.Time,
            unit: e.Unit,
            numberGE: e.NumberGE,
            coefficient: e.CoefficientGradeExam,
            coefficientExam: e.CoefficientGradeExam,
            idSubject: e.IdSubject,
          };
        });
        const other = req.others.map((e) => {
            return createOther(
              e.ActivitiesVolume,
              e.ExamMonitorVolume,
              e.AdvisorVolume,
              e.TimeScientificVolume
            );
          })
           setApprovalForm((prev) => {
             return {
               ...prev,
               theoryClass: [...theory],
               exams: [...exam],
               others: [...other],
             };
           });
      });
     
    }
    setApprovalID((prev)=>{return {...prev,...id}}); 
  }
  function createData(code, fullname, title, status) {
    return { code, fullname, title, status };
  }
  function createOther(activities, examMonitor, advisor, scientific) {
    return { activities, examMonitor, advisor, scientific };
  }

  useLayoutEffect(() => {
    if (semester && semester.value && year && year.value) {
      ApiTeachingVolume.Get(
        `/volume/totalByHead/sem/${
          semester.value
        }/year/${year.value}`
      )
        .then((res) => {
          if (res.status === 200 && res.totalVols && res.totalVols.length > 0) {
            const arr = res.totalVols.map((value) => {
              return createData(
                value.IdLecturer,
                value.FirstName + " " + value.LastName,
                "Volume Form",
                value.Status
              );
            });
            setDataApproval([...arr]);
            setContinues(true);
            setFormsmount(false);
          } else {
            setContinues(false);
            setFormsmount(false);
            alert("Hiện tại học kì này không có lớp")
          }
        })
        .catch((err) => {
          setContinues(false);
          setFormsmount(false);
        });
    }
  }, [semester, year]);

  function hanldeDetail(e) {
    const id = e.target.parentElement.dataset.id;
    const fullName = e.target.parentElement.dataset.fullname;
    data({ id, fullName});
    setFormsmount(true);
  }
  function hanldeAccept(e) {
    setFormsmount(false);
    const id = e.target.parentElement.dataset.id;
    if (semester && id && year) {
      ApiTeachingVolume.Put( `volume/approval/idLec/${id}/sem/${semester.value}/year/${year.value}`,{});
      if (semester && semester.value && year && year.value) {
        ApiTeachingVolume.Get(
          `/volume/totalByHead/sem/${semester.value}/year/${year.value}`
        ).then((res) => {
          if (res.status === 200 && res.totalVols && res.totalVols.length > 0) {
            const arr = res.totalVols.map((value) => {
              return createData(
                value.IdLecturer,
                 value.FirstName+" "+ value.LastName  ,
                "Volume Form",
                value.Status
              );
            });
            setDataApproval([...arr]);
          }
        });
      }
    }
  }
  function hanldeUndo(e) {
    setFormsmount(false);
    const id = e.target.parentElement.dataset.id;
    if (semester && id && year) {
      ApiTeachingVolume.Put(
        `volume/decline/idLec/${id}/sem/${semester.value}/year/${year.value}`,
        {}
      );
      if (semester && semester.value && year && year.value) {
        ApiTeachingVolume.Get(
          `/volume/totalByHead/sem/${semester.value}/year/${year.value}`
        ).then((res) => {
          if (res.status === 200 && res.totalVols && res.totalVols.length > 0) {
            const arr = res.totalVols.map((value) => {
              return createData(
                value.IdLecturer,
                value.FirstName + " " + value.LastName,
                "Volume Form",
                value.Status
              );
            });
            setDataApproval([...arr]);
          }
        });
      }
    }
  }

  return (
    <div className="container">
      <div className={cx("option")}>
        <div className="flex pt-[14.3%] justify-around">
          <span className="w-[30%] ml-[50px]">
            <SelectForm
              options={opt}
              placeholder="Chọn năm học"
              height="34px"
              setSelectedOption={setYear}
            ></SelectForm>
          </span>
          <span className="w-[30%] ml-[-30px]">
            <SelectForm
              options={hocki}
              placeholder="Chọn học kì"
              height="34px"
              setSelectedOption={setSemester}
            ></SelectForm>
          </span>
        </div>
      </div>
      {continues && (
        <TableContainer component={Paper}>
          <Table size="medium" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Lecturer code</StyledTableCell>
                <StyledTableCell align="center">Full Name</StyledTableCell>
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataApproval.map((row) => (
                <TableRow
                  key={row.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.code}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.fullname}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.title}</StyledTableCell>
                  <StyledTableCell
                    style={{
                      color:
                        row.status === "Decline"
                          ? "red"
                          : row.status === "Waiting"
                          ? "greenyellow"
                          : "green",
                      fontWeight: 700,
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <p
                        style={{
                          backgroundColor:
                            row.status === "Decline"
                              ? "red"
                              : row.status === "Waiting"
                              ? "yellow"
                              : "green",
                        }}
                        className="w-[10px] h-[10px] rounded-[50%] mr-2"
                      ></p>
                      {row.status}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className="flex justify-around items-center">
                      {row.status === "Approved" && (
                        <p
                          className="flex justify-around items-center "
                          data-id={row.code}
                          data-fullname={row.fullname}
                        >
                          <GrClear
                            className="text-[16px] cursor-pointer"
                            onClick={hanldeUndo}
                            data-id={row.code}
                            data-fullname={row.fullname}
                          />
                        </p>
                      )}
                      {row.status === "Waiting" && (
                        <p
                          className="flex  items-center justify-around w-[66%]"
                          data-id={row.code}
                          data-fullname={row.fullname}
                        >
                          <AiFillCheckCircle
                            className="text-green-600 text-[16px] cursor-pointer"
                            onClick={hanldeAccept}
                            data-id={row.code}
                            data-fullname={row.fullname}
                          />
                          <GrClear
                            className="text-[16px] cursor-pointer"
                            onClick={hanldeUndo}
                            data-id={row.code}
                            data-fullname={row.fullname}
                          />
                        </p>
                      )}
                      <p data-id={row.code} data-fullname={row.fullname}>
                        <TbListDetails
                          className="text-orange-600 text-[16px] cursor-pointer"
                          onClick={hanldeDetail}
                          data-id={row.code}
                          data-fullname={row.fullname}
                        />
                      </p>
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <p className="mt-4">
        {formsmount && (
          <FormSubject
            title={approvalID}
            year={year.value}
            semester={semester.value}
            theoryClass={approvalForm.theoryClass}
            exams={approvalForm.exams}
            others={approvalForm.others}
            idLec={approvalID}
            btn="view"
          />
        )}
      </p>
    </div>
  );
}

export default Approval;
