import { AiFillCheckCircle } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import {BiMessageDetail} from "react-icons/bi"
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classNames from "classnames/bind";
import styles from "./approval.module.scss"
import SelectForm from "../../SelectForm";
import StyledTableCell from "../../StyledTableCell";
import { ApiTeachingVolume } from "../../../apis/axios";
import FormSubject from "../../Form/sub"

const cx  = classNames.bind(styles)

function Approval() {
    const [continues, setContinues] = useState(false);
    const [dataApproval,setDataApproval] = useState([])
    const [approvalForm,setApprovalForm] = useState()
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
   const [theoryClass, setTheoryClass] = useState([]);
   const [exams, setExams] = useState([]);
   const [others, setOthers] = useState([]);
  // const idlecturer = JSON.parse(localStorage.getItem("IdLecturer"));

    const opt = [
      { value: "2022", label: "2021-2022" },
      { value: "2023", label: "2022-2023" },
      { value: "2024", label: "2024-2025" },
    ];
    const hocki = [
      { value: "1", label: "Học Kỳ I" },
      { value: "2", label: "Học Kỳ II" },
      { value: "3", label: "Học Hè" },
    ];
     function data(id) {
       if (semester && year && semester.value && year.value) {
         ApiTeachingVolume.Get(
           `volume/selfTotalDetail/idLecture/${id}/sem/${semester.value}/year/${year.value}`
         ).then((req) => {
           const theory = req.theoryClass.map((e, index) => {
             return {
               stt: index + 1,
               letter: e.Letter,
               numbercode: e.Number,
               subject: e.SubjectName,
               type: e.Type,
               semester: e.Semester,
               time: e.TimeTeaching,
               unit: e.Unit,
               numberGE: e.NumberOfStudent,
               coefficient: e.Coefficient,
               coefficientGrade: e.Coefficient,
               idSubject: e.IdSubject,
             };
           });
           setTheoryClass([...theory]);
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
               numberGE: e.numberGE,
               coefficient: e.CoefficientGradeExam,
               coefficientExam: e.CoefficientGradeExam,
               idSubject: e.IdSubject,
             };
           });
           setExams([...exam]);
           setOthers([
             ...req.others.map((e) => {
               return createOther(
                 e.ActivitiesVolume,
                 e.ExamMonitorVolume,
                 e.AdvisorVolume,
                 e.TimeScientificVolume
               );
             }),
           ]);
         });
       }
     }
      function createData(code, fullname, title, status) {
        return { code, fullname, title, status };
      }
    function createOther(activities, examMonitor, advisor, scientific) {
      return { activities, examMonitor, advisor, scientific };
    }
      useEffect(() => {
        if (semester && semester.value && year && year.value){
          ApiTeachingVolume.Get(
            `/volume/totalByDean/sem/${semester.value}/year/${year.value}`
          )
            .then((res) => {
              if (res.status === 200 && res.totalVols && res.totalVols.length >0) {
                const arr = res.totalVols.map((value) => {
                  return createData(
                    value.IdLecturer,
                    value.LastName + " " + value.FirstName,
                    "What What",
                    value.Status
                  );
                });
                setDataApproval([...arr]);
                setContinues(true);
              } else {
                setContinues(false);
              }
            })
            .catch((err) => {
              setContinues(false);
            });
        }
      }, [semester, year]);
   
function hanldeDetail(e){
  const id = e.target.dataset.id;
  data(id);
  setApprovalForm(
    <FormSubject
      title={id}
      year={year.value}
      semester={semester.value}
      theoryClass={theoryClass}
      exams={exams}
      others={others}
      idLec = {id}
      btn="view"
    />
  );
}
function hanldeAccept(e){
  const id = e.target.parentElement.dataset.id;
   if (semester && id && year) {
     ApiTeachingVolume.Put(
       `volume/approval/idLec/${id}/sem/${semester.value}/year/${year.value}`,
       {}
     );
      if (semester && semester.value && year && year.value) {
        ApiTeachingVolume.Get(
          `/volume/totalByDean/sem/${semester.value}/year/${year.value}`
        )
          .then((res) => {
            if (
              res.status === 200 &&
              res.totalVols &&
              res.totalVols.length > 0
            ) {
              const arr = res.totalVols.map((value) => {
                return createData(
                  value.IdLecturer,
                  value.LastName + " " + value.FirstName,
                  "What What",
                  value.Status
                );
              });
              setDataApproval([...arr]);
            } 
          })
      }
   }
}
function hanldeUndo(e){
  const id = e.target.parentElement.dataset.id;
    if(semester && id && year){
      ApiTeachingVolume.Put(`volume/decline/idLec/${id}/sem/${semester.value}/year/${year.value}`,{});
       if (semester && semester.value && year && year.value) {
         ApiTeachingVolume.Get(
           `/volume/totalByDean/sem/${semester.value}/year/${year.value}`
         )
           .then((res) => {
             if (
               res.status === 200 &&
               res.totalVols &&
               res.totalVols.length > 0
             ) {
               const arr = res.totalVols.map((value) => {
                 return createData(
                   value.IdLecturer,
                   value.LastName + " " + value.FirstName,
                   "What What",
                   value.Status
                 );
               });
               setDataApproval([...arr]);
             } 
           })
       }
    }
}
    return (
      <div className="w-[726px]">
        <div className={cx("option")}>
          <div className="flex pt-[14.3%] justify-around">
            <span className="w-[30%] ml-[50px]">
              <SelectForm
                options={opt}
                placeholder="Chọn năm học"
                height="30px"
                setSelectedOption={setYear}
              ></SelectForm>
            </span>
            <span className="w-[30%] ml-[-30px]">
              <SelectForm
                options={hocki}
                placeholder="Chọn học kì"
                height="30px"
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
                  <StyledTableCell align="center">
                    Lecturer code
                  </StyledTableCell>
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
                    <StyledTableCell align="center">
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{
                        color:
                          row.status === "Waiting"
                            ? "yellow"
                            : row.status === "Accept"
                            ? "green"
                            : "gray",
                      }}
                    >
                      {row.status}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex justify-around items-center">
                        {row.status === "Approved" && (
                          <p
                            className="flex justify-around items-center "
                            data-id={row.code}
                          >
                            <BiMessageDetail
                              className="text-[16px] cursor-pointer"
                              onClick={hanldeUndo}
                              data-id={row.code}
                            />
                          </p>
                        )}
                        {row.status === "Waiting" && (
                          <p
                            className="flex  items-center justify-around w-[66%]"
                            data-id={row.code}
                          >
                            <BiMessageDetail
                              className="text-[16px] cursor-pointer"
                              onClick={hanldeUndo}
                              data-id={row.code}
                            />
                            <AiFillCheckCircle
                              className="text-green-600 text-[16px] cursor-pointer"
                              onClick={hanldeAccept}
                              data-id={row.code}
                            />
                          </p>
                        )}
                        <p data-id={row.code}>
                          <TbListDetails
                            className="text-orange-600 text-[16px] cursor-pointer"
                            onClick={hanldeDetail}
                            data-id={row.code}
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
        {approvalForm}
      </div>
    );
}

export default Approval;