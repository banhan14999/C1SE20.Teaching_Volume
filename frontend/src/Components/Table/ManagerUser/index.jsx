import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AiFillCloseCircle } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import StyledTableCell from "../../StyledTableCell";
import AddUser from "../../Form/AddUser";
import { useDispatch } from "react-redux";
import { SetUpdate } from "../../../Redux/Actions/index";
import { useEffect, useState } from "react";
import {Get} from "../../../axios"
import axios from "axios";
function ManagerUser(props) {
  const dispath = useDispatch();
  const [update, setUpdate] = useState(true);
  const [user,setUser] = useState([])
  function createData(Id, FullName, School, Derpartment, Role) {
    return { Id, FullName, School, Derpartment, Role };
  }

  const handleUpdate = () => {
     dispath(SetUpdate("Update user"));
    setUpdate(false);
  };
  useEffect(()=>{
    Get("/user/all").then((res)=>{
      const arr = res.lecturers.map((value)=>{
        return createData(
          value.IdLecturer,
          value.FirstName + " " + value.LastName,
          value.IdDepartment,
          value.Department,
          // "Software Engineer",
          value.IdRole
        );
      })
      setUser([...arr])
    })
  },[])
  
  return (
    <div>
      {update ? (
        <div className="container">
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Users
          </div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow style={{}}>
                  <StyledTableCell align="center">DTU-ID</StyledTableCell>
                  <StyledTableCell align="center">Full Name</StyledTableCell>
                  <StyledTableCell align="center">School</StyledTableCell>
                  <StyledTableCell align="center">Department</StyledTableCell>
                  <StyledTableCell align="center">Role</StyledTableCell>
                  <StyledTableCell align="center" colSpan={2}>
                    Action
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((row) => (
                  <TableRow
                    key={row.Id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.Id}
                    </StyledTableCell>
                    <StyledTableCell>{row.FullName}</StyledTableCell>
                    <StyledTableCell>{row.School}</StyledTableCell>
                    <StyledTableCell>{row.Derpartment}</StyledTableCell>
                    <StyledTableCell>{row.Role}</StyledTableCell>
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
          </TableContainer>
        </div>
      ) : props.hide ? (
        <AddUser hide="hidden" btn="Update" title="Updata User"></AddUser>
      ) : (
        <div className="container">
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Users
          </div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow style={{}}>
                  <StyledTableCell align="center">DTU-ID</StyledTableCell>
                  <StyledTableCell align="center">Full Name</StyledTableCell>
                  <StyledTableCell align="center">School</StyledTableCell>
                  <StyledTableCell align="center">Department</StyledTableCell>
                  <StyledTableCell align="center">Role</StyledTableCell>
                  <StyledTableCell align="center" colSpan={2}>
                    Action
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((row) => (
                  <TableRow
                    key={row.Id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.Id}
                    </StyledTableCell>
                    <StyledTableCell>{row.FullName}</StyledTableCell>
                    <StyledTableCell>{row.School}</StyledTableCell>
                    <StyledTableCell>{row.Derpartment}</StyledTableCell>
                    <StyledTableCell>{row.Role}</StyledTableCell>
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
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default ManagerUser;
