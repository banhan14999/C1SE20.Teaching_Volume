import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {GrUpdate} from "react-icons/gr"
import StyledTableCell from "../../../StyledTableCell";
function Other(props) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Activities</StyledTableCell>
              <StyledTableCell align="center">Exam Monitor</StyledTableCell>
              <StyledTableCell align="center">Advisor</StyledTableCell>
              <StyledTableCell align="center">Time Scientific</StyledTableCell>
              <StyledTableCell align="center">Semester</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow
                key={row.Activities}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {row.Activities}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.ExamMonitor}
                </StyledTableCell>
                <StyledTableCell align="center">{row.Advisor}</StyledTableCell>
                <StyledTableCell align="center">{row.TimeScientific}</StyledTableCell>
                <StyledTableCell align="center">{row.Semester}</StyledTableCell>
                <StyledTableCell>
                  <div className="flex items-center cursor-pointer">
                    <GrUpdate className="mr-2"></GrUpdate>
                    <div>Update</div>
                  </div>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Other;

