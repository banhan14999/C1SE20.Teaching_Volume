import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../../StyledTableCell";
import {CgPlayListRemove} from "react-icons/cg"
function GradingVolume({ rows, setGrading,btn }) {
  function handleRemove(e) {
    const id = e.target.dataset.list;
   const arr = rows.filter((value, index) => index !== Number(id));
   setGrading([...arr])
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "#afafaf" }}>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center" rowSpan={2} colSpan={2}>
                Mã môn học
                <div className="flex justify-between border-t">
                  <p className="mr-[6px]">Chữ</p>
                  <p className="ml-[6px]">Số</p>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">Môn học</StyledTableCell>
              <StyledTableCell align="center">Cấp</StyledTableCell>
              <StyledTableCell align="center">Loại</StyledTableCell>
              <StyledTableCell align="center">Học kì</StyledTableCell>
              <StyledTableCell align="center">Thời gian</StyledTableCell>
              <StyledTableCell align="center">Đơn vị</StyledTableCell>
              <StyledTableCell align="center">Số lượng</StyledTableCell>
              <StyledTableCell align="center">Hệ số</StyledTableCell>
              {btn !== "view" && (
                <StyledTableCell align="center">Hành động</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.letter}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.numbercode}
                </StyledTableCell>
                <StyledTableCell align="center">{row.subject}</StyledTableCell>
                <StyledTableCell align="center">{row.grade}</StyledTableCell>
                <StyledTableCell align="center">{row.type}</StyledTableCell>
                <StyledTableCell align="center">{row.semester}</StyledTableCell>
                <StyledTableCell align="center">{row.time}</StyledTableCell>
                <StyledTableCell align="center">{row.unit}</StyledTableCell>
                <StyledTableCell align="center">{row.numberGE}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.coefficient}
                </StyledTableCell>

                {btn !== "view" && (
                  <StyledTableCell align="center">
                    <div
                      onClick={handleRemove}
                      data-list={index}
                      className="cursor-pointer flex justify-center items-center"
                    >
                      <CgPlayListRemove className="text-[20px] text-[blue] text-center pointer-events-none" />
                    </div>
                  </StyledTableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default GradingVolume;
