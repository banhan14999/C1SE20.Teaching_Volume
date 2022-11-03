import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../../StyledTableCell";
function ExamVolume(props) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center" rowSpan={2} colSpan={2}>
                Subject Code
                <StyledTableCell hiden="1" align="left" className="border-none">
                  Letter
                </StyledTableCell>
                <StyledTableCell hiden="1" align="left">
                  Number
                </StyledTableCell>
              </StyledTableCell>
              <StyledTableCell align="center">Subject</StyledTableCell>
              <StyledTableCell align="center">Grade</StyledTableCell>
              <StyledTableCell align="center">Semester</StyledTableCell>
              <StyledTableCell align="center">
                Number of Student
              </StyledTableCell>
              <StyledTableCell align="center">
                Class Coefficient
              </StyledTableCell>
              <StyledTableCell align="center">
                Subject Coefficient
              </StyledTableCell>
              <StyledTableCell align="center">Time Teaching</StyledTableCell>
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

export default ExamVolume;
