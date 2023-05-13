import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiEdit } from "react-icons/bi";
import StyledTableCell from "../../../StyledTableCell";
function Other(props) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "#afafaf" }}>
            <TableRow>
              <StyledTableCell align="center">Các hoạt động</StyledTableCell>
              <StyledTableCell align="center">Coi thi</StyledTableCell>
              <StyledTableCell align="center">Cố vấn</StyledTableCell>
              <StyledTableCell align="center">Thời gian khoa học</StyledTableCell>
              {props.btn !== "view" && (
                <StyledTableCell align="center">Hành động</StyledTableCell>
              )}
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
                  {props.btn !== "view" && (
                    <StyledTableCell align="center">
                      <div
                        className="flex items-center cursor-pointer justify-center"
                        onClick={props.onClick}
                      >
                        <BiEdit className="mr-1 pointer-events-none"></BiEdit>
                        <div className="pointer-events-none">Cập nhật</div>
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

export default Other;

