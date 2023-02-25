import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../StyledTableCell";

function MonitorTheExam() {
  return (
    <div>
      <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
        5. Coi thi
      </div>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "#afafaf" }}>
            <TableRow>
              <StyledTableCell align="center">HK I</StyledTableCell>
              <StyledTableCell align="center">HK II</StyledTableCell>
              <StyledTableCell align="center">HK HÈ 2020-2021</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell align="center">2</StyledTableCell>
              <StyledTableCell align="center">zzzzzzzzz</StyledTableCell>
              <StyledTableCell align="center">zzzzzzzzz</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MonitorTheExam;
