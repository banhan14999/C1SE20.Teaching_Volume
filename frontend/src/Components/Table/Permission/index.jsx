import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { default as Button } from "../../Button";

function Permission() {
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(Stt,User, Name, Role, Permission) {
  return { Stt, User, Name, Role, Permission };
}

const rows = [
  createData(1, "Nguyen van a","Nguyen van a", "admin", "edit,class delete..."),
  createData(2, "Nguyen van a","Nguyen van a", "admin", "edit,class delete..."),
  createData(3, "Nguyen van a","Nguyen van a", "admin", "edit,class delete..."),
  createData(4, "Nguyen van a","Nguyen van a", "admin", "edit,class delete..."),

];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 720 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="center">User</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">Permission</StyledTableCell>
            <StyledTableCell align="center">Manager</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.Stt}>
              <StyledTableCell component="th" scope="row">
                {row.Stt}
              </StyledTableCell>
              <StyledTableCell align="center">{row.User}</StyledTableCell>
              <StyledTableCell align="center">{row.Name}</StyledTableCell>
              <StyledTableCell align="center">{row.Role}</StyledTableCell>
              <StyledTableCell align="center">{row.Permission}</StyledTableCell>
              <StyledTableCell align="center">
                <div className="flex items-center justify-center">
                  <div className="mr-2">
                    <Button bgcolor="#0a7a0a" width="100px" size="small" >
                      Phân vai trò
                    </Button>
                  </div>
                  <div className="">
                    <Button bgcolor="#eb4f04" size="small" width="100px">
                      Phân quyền
                    </Button>
                  </div>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}

export default Permission;