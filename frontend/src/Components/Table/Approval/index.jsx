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
const cx  = classNames.bind(styles)

function Approval() {
    const [continues, setContinues] = useState(false);
    const [dataApproval,setDataApproval] = useState([])
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
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
      function createData(code, fullname, title, status) {
        return { code, fullname, title, status };
      }

      useEffect(() => {
        if (semester && semester.value && year && year.value){
          ApiTeachingVolume.Get(
            `/volume/totalByDean/sem/${semester.value}/year/${year.value}`
          )
            .then((res) => {
              console.log(res);
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
                    <StyledTableCell align="center" style={{color: "yellow" }}>
                      {row.status}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex justify-around items-center">
                        {row.status === "Done" && (
                          <>
                            <BiMessageDetail className="text-[16px]" />
                            <TbListDetails className="text-orange-600 text-[16px]" />
                          </>
                        )}
                        {row.status === "Waiting" && (
                          <>
                            <BiMessageDetail className="text-[16px]" />
                            <AiFillCheckCircle className="text-green-600 text-[16px]" />
                            <TbListDetails className="text-orange-600 text-[16px]" />
                          </>
                        )}
                        {row.status === "Revoke" && (
                          <>
                            <TbListDetails className="text-orange-600 text-[16px]" />
                          </>
                        )}
                      </div>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    );
}

export default Approval;