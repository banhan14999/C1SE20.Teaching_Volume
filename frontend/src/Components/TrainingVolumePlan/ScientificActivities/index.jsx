import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../StyledTableCell";
import { useEffect, useState } from "react";

function ScientificActivities({ academicAdvisor }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const to = academicAdvisor.reduce((total, val) => {
      return total + Number(val.AdvisorVolume);
    }, 0);
    setTotal(to);
  }, []);
  console.log(academicAdvisor);
  return (
    <div>
      <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
        8. Hoạt động khoa học
      </div>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "#afafaf" }}>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Nội dung</StyledTableCell>
              <StyledTableCell align="center">Qui chuẩn</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="left">
                Thời gian nghiên cứu khoa học
              </StyledTableCell>
              <StyledTableCell align="center">{total}</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ScientificActivities;
