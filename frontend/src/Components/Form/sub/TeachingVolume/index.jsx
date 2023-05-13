import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../../StyledTableCell";
function TeachingVolume(props) {
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
              <StyledTableCell align="center">Học kì</StyledTableCell>
              <StyledTableCell align="center">
                Số học sinh
              </StyledTableCell>
              <StyledTableCell align="center">
                Hệ số lớp
              </StyledTableCell>
              <StyledTableCell align="center">
                Hệ số môn học
              </StyledTableCell>
              <StyledTableCell align="center">Thời gian giảng dạy</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow
                key={row.stt}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {row.stt}
                </StyledTableCell>
                <StyledTableCell align="center">{row.letter}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.numbercode}
                </StyledTableCell>
                <StyledTableCell align="center">{row.subject}</StyledTableCell>
                <StyledTableCell align="center">{row.grade}</StyledTableCell>
                <StyledTableCell align="center">{row.semester}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.numberofsubject}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.classcoefficient}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.subjectcoefficient}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.timecoefficient}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default TeachingVolume;