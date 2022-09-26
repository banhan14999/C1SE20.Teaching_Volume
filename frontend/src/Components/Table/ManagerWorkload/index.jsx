import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import StyledTableCell from "../../StyledTableCell";
import { GrUpdate } from "react-icons/gr";
import {TbListDetails} from "react-icons/tb"
function ManagerWorkload() {
  function createData(stt, typeWorkload, status) {
    return { stt, typeWorkload, status };
  }

  const rows = [
    createData(1, "Lý thuyết/Thực hành", "Chưa làm"),
    createData(2, "Thực tế đồ án...", "Đã Duyệt"),
    createData(3, "Chấm bài", "Đang đợi duyệt"),
    createData(4, "Đề thi", "Chưa làm", "Update"),
    createData(5, "Coi thi, sh khoa, bộ môn", "Chưa làm"),
    createData(6, "HD khoa hoc", "Đã Duyệt"),
  ];
  return (
    <div className="w-[720px]">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 720 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow style={{}}>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">
                Type of work load
              </StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.stt}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {row.stt}
                </StyledTableCell>
                <StyledTableCell>{row.typeWorkload}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell>
                  <Link to="/" className="flex items-center ">
                    {row.status === "Đang đợi duyệt" ||
                    row.status === "Đã Duyệt" ? (
                      <>
                        <GrUpdate className="mr-2"></GrUpdate> <p>Detail</p>
                      </>
                    ) : (
                      <>
                        <TbListDetails className="mr-2"></TbListDetails>
                        <p>Update</p>
                      </>
                    )}
                  </Link>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManagerWorkload;
