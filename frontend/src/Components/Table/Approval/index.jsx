import { AiFillCheckCircle } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import {BiMessageDetail} from "react-icons/bi"
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classNames from "classnames/bind";

import styles from "./approval.module.scss"
import Button from "../../Button";
import SelectForm from "../../SelectForm";
import StyledTableCell from "../../StyledTableCell";
const cx  = classNames.bind(styles)

function Approval() {
    const [continues, setContinues] = useState(false);
    const opt = [
      { value: "2021-2022", label: "2021-2022" },
      { value: "2022-2023", label: "2022-2023" },
      { value: "2023-2024", label: "2024-2025" },
    ];
    const hocki = [
      { value: "Học Kỳ I", label: "Học Kỳ I" },
      { value: "Học Kỳ II", label: "Học Kỳ II" },
      { value: "Học Hè", label: "Học Hè" },
    ];
      function createData(code, fullname, title, status) {
        return { code, fullname, title, status };
      }
        const rows = [
          createData("22233344", "Ngô Thanh Hiền", "Teaching volume", "Waiting"),
           createData("222333441", "Ngô Thanh Hiền", "Teaching volume", "Waiting"),
        ];
      function handleContinue() {
        setContinues(true);
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
              ></SelectForm>
            </span>
            <span className="w-[30%] ml-[-30px]">
              <SelectForm
                options={hocki}
                placeholder="Chọn học kì"
                height="30px"
              ></SelectForm>
            </span>
          </div>
        </div>
        <div className="text-center mb-3">
          <Button width="200px" bgcolor="#950B0B" onClick={handleContinue}>
            Tiếp tục
          </Button>
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
                {rows.map((row) => (
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
                    <StyledTableCell align="center">
                      {row.status}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex justify-around items-center">
                        <BiMessageDetail className="text-[16px]" />
                        <AiFillCheckCircle className="text-green-600 text-[16px]" />
                        <TbListDetails className="text-orange-600 text-[16px]" />
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