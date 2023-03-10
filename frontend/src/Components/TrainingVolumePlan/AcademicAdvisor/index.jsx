import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../StyledTableCell";

function AcademicAdvisor({ scientificActivities }) {
  return (
    <div>
      <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
        7. Cố vấn học tập
      </div>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "#afafaf" }}>
            <TableRow>
              <StyledTableCell align="center">HK I</StyledTableCell>
              <StyledTableCell align="center">HK II</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell align="center">
                {scientificActivities.length >= 1 &&
                  scientificActivities[0].TimeScientificVolume}
              </StyledTableCell>
              <StyledTableCell align="center">
                {scientificActivities.length >= 2 &&
                  scientificActivities[1].TimeScientificVolume}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AcademicAdvisor;
