import { useEffect, useState } from "react";
import { ApiTeachingVolume } from "../../../apis/axios";
import FormSubject from "../../Form/sub"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../StyledTableCell";
import styles from "./workload.module.scss"
import classNames from "classnames/bind";
import SelectForm from "../../SelectForm";
import {TbListDetails} from "react-icons/tb"
import {BiEdit} from "react-icons/bi"
const cx = classNames.bind(styles)

function ManagerWorkload() {
  const [total,setTotal] = useState([])
    const [year, setYear] = useState(null);
    const [semester, setSemester] = useState(null);
    const [theoryClass,setTheoryClass] = useState([])
    const [exams, setExams] = useState([]);
    const [others, setOthers] = useState([]);
  const [btnupdate,setBtnupdate]= useState("btn")
    function createData(teaching,grading,project,exam,activities,examMonitor,advisor,timeScientific,total,status) {
    return { teaching,grading,project,exam,activities,examMonitor,advisor,timeScientific,total,status };
  }
  const idlecturer = JSON.parse(localStorage.getItem("IdLecturer"));
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
      function createOther(activities, examMonitor, advisor, scientific) {
        return { activities, examMonitor, advisor, scientific };
      }
      function data(){
 if (semester && year && semester.value && year.value) {
      ApiTeachingVolume.Get(
        `volume/selfTotalDetail/idLecture/${idlecturer}/sem/${semester.value}/year/${year.value}`
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
            numberGE: e.NumberGE,
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
  function handleView() {
  setTotal([]);
   data()
   setBtnupdate("view")
  }
 function handleupdate(){
    setTotal([]);
    data()
    setBtnupdate("update")
  }
  useEffect(() => {
    if (semester && year) {
      ApiTeachingVolume.Get(
        `volume/checkExist/sem/${semester.value}/year/${year.value}`
      ).then((res) => {
        if (res.status === 200) {
          const arr = res.totalVolume.map((e) => {
            return createData(
              e.TeachingVolume,
              e.GradingVolume,
              e.ProjectVolume,
              e.ExamVolume,
              e.ActivitiesVolume,
              e.ExamMonitorVolume,
              e.AdvisorVolume,
              e.TimeScientificVolume,
              e.TotalVolume,
              e.Status
            );
          });
          setTotal([...arr]);
        }else{
          setTotal([])
          setExams([]);
          setOthers([createOther(0,0,0,0)]);
          setTheoryClass([])
        }
      });
    }
  }, [semester , year ]);
  return (
    <div className="container">
      <div className={cx("option")}>
        <div className="flex pt-[14.3%] justify-around">
          <span className="w-[30%] ml-[50px] z-10">
            <SelectForm
              options={opt}
              placeholder="Chọn năm học"
              height="34px"
              setSelectedOption={setYear}
            ></SelectForm>
          </span>
          <span className="w-[30%] ml-[-30px] z-10">
            <SelectForm
              options={hocki}
              placeholder="Chọn học kì"
              height="34px"
              setSelectedOption={setSemester}
            ></SelectForm>
          </span>
        </div>
      </div>
      {total && total.length === 0 && year && semester && (
        <FormSubject
          year={year.value}
          semester={semester.value}
          theoryClass={theoryClass}
          exams={exams}
          others={others}
          btn={btnupdate}
        ></FormSubject>
      )}
      {total && total.length !== 0 && (
        <div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead style={{ backgroundColor: "#afafaf" }}>
                <TableRow style={{}}>
                  <StyledTableCell align="center">Teaching</StyledTableCell>
                  <StyledTableCell align="center">Grading</StyledTableCell>
                  <StyledTableCell align="center">Project</StyledTableCell>
                  <StyledTableCell align="center">Exam</StyledTableCell>
                  <StyledTableCell align="center">Activities</StyledTableCell>
                  <StyledTableCell align="center">ExamMonitor</StyledTableCell>
                  <StyledTableCell align="center">Advisor</StyledTableCell>
                  <StyledTableCell align="center">
                    TimeScientific
                  </StyledTableCell>
                  <StyledTableCell align="center">Total</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {total.map((row) => (
                  <TableRow
                    key={row.teaching}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.teaching}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.grading}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.project}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.exam}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.activities}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.examMonitor}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.advisor}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.timeScientific}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.total}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{
                        backgroundColor: "#fff0c2",
                        color:
                          row.status === "Decline"
                            ? "red"
                            : row.status === "Waiting"
                            ? "greenyellow"
                            : "green",
                        fontWeight: 700,
                      }}
                    >
                      <div
                        style={{
                          color:
                            row.status === "Decline"
                              ? "#c62828"
                              : row.status === "Waiting"
                              ? "#a68b00"
                              : "#388e3c",
                        }}
                        className="flex justify-between items-center"
                      >
                        {row.status}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.status === "Decline" ? (
                        <p
                          className="flex justify-around items-center cursor-pointer"
                          onClick={handleupdate}
                        >
                          <BiEdit />
                          Update
                        </p>
                      ) : (
                        <p
                          className="flex justify-around items-center cursor-pointer"
                          onClick={handleView}
                        >
                          <TbListDetails />
                          Detail
                        </p>
                      )}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default ManagerWorkload;
