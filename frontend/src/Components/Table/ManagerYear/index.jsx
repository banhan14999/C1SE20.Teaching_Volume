import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AiFillCloseCircle } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import AddYear from "../../Form/AddYear"
import StyledTableCell from "../../StyledTableCell";
function ManagerYear() {
  const [update,setUpdate] = React.useState(true)
  function createData(Id, Start, Finish, CreatedAdd,UpdatedAdd) {
    return { Id, Start, Finish, CreatedAdd, UpdatedAdd };
  }

  const handleUpdate = ()=>{
      setUpdate(false)
  }
  const rows = [
    createData(1111, 2020, 2021, "24/05/2021", "24/05/2022"),
    createData(1112, 2020, 2021, "24/05/2021", "24/05/2022"),
    createData(1113, 2020, 2021, "24/05/2021", "24/05/2022"),
    createData(1114, 2020, 2021, "24/05/2021", "24/05/2022"),
  ];
  return (
    <div className="w-[720px]">
      {update ?
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 720 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow style={{}}>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Start</StyledTableCell>
              <StyledTableCell align="center">Finish</StyledTableCell>
              <StyledTableCell align="center">Created Add</StyledTableCell>
              <StyledTableCell align="center">Updated Add</StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.Id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {row.Id}
                </StyledTableCell>
                <StyledTableCell>{row.Start}</StyledTableCell>
                <StyledTableCell>{row.Finish}</StyledTableCell>
                <StyledTableCell>{row.CreatedAdd}</StyledTableCell>
                <StyledTableCell>{row.UpdatedAdd}</StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    className="flex justify-center  cursor-pointer "
                    onClick={handleUpdate}
                  >
                    <GrUpdate color="#0a7a0a" fontSize={14}></GrUpdate>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className="flex justify-center cursor-pointer">
                    <AiFillCloseCircle
                      color="#eb4f04"
                      fontSize={16}
                    ></AiFillCloseCircle>
                  </div>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>:
      <AddYear></AddYear>
      }
    </div>
  );
}

export default ManagerYear;
