import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../../StyledTableCell";
import { CgPlayListRemove } from "react-icons/cg";

function ExamVolume({ rows, setExamvo,btn }) {
  function handleRemove(e) {
    const stt = e.target.dataset.list;
    const arr = rows.filter((value) => value.stt !== Number(stt));
    setExamvo([...arr]);
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "#afafaf" }}>
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
              {btn !== "view" && (
                <StyledTableCell align="center">Action</StyledTableCell>
              )}
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
                      data-list={row.stt}
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

export default ExamVolume;
