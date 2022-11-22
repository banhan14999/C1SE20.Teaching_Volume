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
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center" rowSpan={2} colSpan={2}>
                Subject Code
                <div className="flex justify-between border-t">
                  <p className="mr-[6px]">Letter</p>
                  <p className="ml-[6px]">Number</p>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">Subject</StyledTableCell>
              <StyledTableCell align="center">Grade</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Semester</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Unit</StyledTableCell>
              <StyledTableCell align="center">Number</StyledTableCell>
              <StyledTableCell align="center">Coefficient</StyledTableCell>
              {btn !== "btn" && (
                <StyledTableCell align="center">Action</StyledTableCell>
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

                {btn !== "btn" && (
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
