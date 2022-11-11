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

const cx = classNames.bind(styles)

function ManagerWorkload() {
  const [total,setTotal] = useState([])
    const [year, setYear] = useState(null);
    const [semester, setSemester] = useState(null);
    function createData(teaching,grading,project,exam,activities,examMonitor,advisor,timeScientific,total,status) {
    return { teaching,grading,project,exam,activities,examMonitor,advisor,timeScientific,total,status };
  }
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
  function handleupdate(){
    setTotal([]);
  }
  useEffect(() => {
    if (semester && year && semester.value && year.value) {
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
        }
      });
    }
  }, [semester, year]);
  return (
    <>
      <div className={cx("option")}>
        <div className="flex pt-[14.3%] justify-around">
          <span className="w-[30%] ml-[50px] z-10">
            <SelectForm
              options={opt}
              placeholder="Chọn năm học"
              height="30px w-full"
              setSelectedOption={setYear}
            ></SelectForm>
          </span>
          <span className="w-[30%] ml-[-30px] z-10">
            <SelectForm
              options={hocki}
              placeholder="Chọn học kì"
              height="30px w-full"
              setSelectedOption={setSemester}
            ></SelectForm>
          </span>
        </div>
      </div>
      {total && total.length === 0 && year && semester && (
        <FormSubject year={year.value} semester={semester.value}></FormSubject>
      )}
      {total && total.length !== 0 && (
        <div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
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
                    <StyledTableCell>{row.grading}</StyledTableCell>
                    <StyledTableCell>{row.project}</StyledTableCell>
                    <StyledTableCell>{row.exam}</StyledTableCell>
                    <StyledTableCell>{row.activities}</StyledTableCell>
                    <StyledTableCell>{row.examMonitor}</StyledTableCell>
                    <StyledTableCell>{row.advisor}</StyledTableCell>
                    <StyledTableCell>{row.timeScientific}</StyledTableCell>
                    <StyledTableCell>{row.total}</StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
                    <StyledTableCell>
                      <p className="flex justify-around items-center"
                      onClick = {handleupdate}
                      >
                        <TbListDetails />
                        Detail
                      </p>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}

export default ManagerWorkload;
