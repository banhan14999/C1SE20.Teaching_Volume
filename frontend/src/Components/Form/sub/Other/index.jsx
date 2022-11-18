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
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows &&
              props.rows.map((row) => (
                <TableRow
                  key={row.activities}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.activities}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examMonitor}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.advisor}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.scientific}
                  </StyledTableCell>
                  <StyledTableCell>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={props.onClick}
                    >
                      <GrUpdate className="mr-2 pointer-events-none"></GrUpdate>
                      <div className="pointer-events-none">Update</div>
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

