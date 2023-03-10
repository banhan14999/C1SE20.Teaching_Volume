import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../StyledTableCell";

function ScientificActivities({ academicAdvisor }) {
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
              <StyledTableCell align="center">QUI CHUẨN</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="left">Đề tài NCKH</StyledTableCell>
              <StyledTableCell align="center">zzzzzzzzz</StyledTableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell align="center">2</StyledTableCell>
              <StyledTableCell align="left">
                Hướng dẫn sinh viên NCKH
              </StyledTableCell>
              <StyledTableCell align="center">zzzzzzzzz</StyledTableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell align="center">3</StyledTableCell>
              <StyledTableCell align="left">
                Hoạt động khác (ghi rõ nếu được qui chuẩn theo qui định):
              </StyledTableCell>
              <StyledTableCell align="center">zzzzzzzzz</StyledTableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell align="left" colSpan={2}>
                TỔNG CỘNG:
              </StyledTableCell>
              <StyledTableCell align="center">zzzzzzzzz</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ScientificActivities;
