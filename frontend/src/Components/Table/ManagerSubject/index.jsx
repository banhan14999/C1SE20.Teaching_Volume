import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AiFillCloseCircle } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import StyledTableCell from "../../StyledTableCell";
import AddSubject from "../../Form/AddSubject";
import { useDispatch } from "react-redux";
import { SetUpdate } from "../../../Redux/Actions/index";
function ManagerSubject(props) {
  const dispath = useDispatch();
  const [update, setUpdate] = React.useState(true);
  function createData(Code, Subject, Credit, Type) {
    return { Code, Subject, Credit, Type };
  }

  const handleUpdate = () => {
     dispath(SetUpdate("Update subject"));
    setUpdate(false);
  };
  const rows = [
    createData(1111, 2020, 2021, "24/05/2021"),
    createData(1112, 2020, 2021, "24/05/2021"),
    createData(1113, 2020, 2021, "24/05/2021"),
    createData(1114, 2020, 2021, "24/05/2021"),
  ];
  return (
    <div>
      {update ? (
        <div className="container">
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Subject
          </div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow style={{}}>
                  <StyledTableCell align="center">Code</StyledTableCell>
                  <StyledTableCell align="center">Subject</StyledTableCell>
                  <StyledTableCell align="center">Credit</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.Code}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.Code}
                    </StyledTableCell>
                    <StyledTableCell>{row.Subject}</StyledTableCell>
                    <StyledTableCell>{row.Credit}</StyledTableCell>
                    <StyledTableCell>{row.Type}</StyledTableCell>
                    <StyledTableCell align="center">
                      <div
                        className="flex justify-center items-center cursor-pointer p-1"
                        onClick={handleUpdate}
                      >
                        <GrUpdate
                          color="#0a7a0a"
                          className="mr-2"
                          fontSize={14}
                        ></GrUpdate>
                        <span>Update</span>
                      </div>
                      <div className="flex justify-center cursor-pointer p-1 border-t-1 border-black ">
                        <AiFillCloseCircle
                          color="#eb4f04"
                          className="mr-2"
                          fontSize={16}
                        ></AiFillCloseCircle>
                        <span>Detail</span>
                      </div>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : props.hide ? (
        <AddSubject btn="Update" title="Updata Subject"></AddSubject>
      ) : (
        <div className="container">
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Subject
          </div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow style={{}}>
                  <StyledTableCell align="center">Code</StyledTableCell>
                  <StyledTableCell align="center">Subject</StyledTableCell>
                  <StyledTableCell align="center">Credit</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.Code}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.Code}
                    </StyledTableCell>
                    <StyledTableCell>{row.Subject}</StyledTableCell>
                    <StyledTableCell>{row.Credit}</StyledTableCell>
                    <StyledTableCell>{row.Type}</StyledTableCell>
                    <StyledTableCell align="center">
                      <div
                        className="flex justify-center items-center cursor-pointer p-1"
                        onClick={handleUpdate}
                      >
                        <GrUpdate
                          color="#0a7a0a"
                          className="mr-2"
                          fontSize={14}
                        ></GrUpdate>
                        <span>Update</span>
                      </div>
                      <div className="flex justify-center cursor-pointer p-1 border-t-1 border-black ">
                        <AiFillCloseCircle
                          color="#eb4f04"
                          className="mr-2"
                          fontSize={16}
                        ></AiFillCloseCircle>
                        <span>Detail</span>
                      </div>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default ManagerSubject;
