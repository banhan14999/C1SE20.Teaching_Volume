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
import { Get, Delete } from "../../../utils/axios";
import { DataUpdate } from "../../../Redux/Actions/index";
function ManagerUser(props) {
  const dispath = useDispatch();
  const [update, setUpdate] = useState(true);
  const [user,setUser] = useState([])
  function createData(Id, FullName, School, Derpartment, Role, Username) {
    return { Id, FullName, School, Derpartment, Role, Username };
  }
function clickDelete(e) {
  const user_id = e.target.attributes[1].nodeValue
  Delete("/user/delete/", user_id);
  const arr = user.filter((value) => {
    return value.Username !== user_id;
  });
  setUser(arr);
}
  const handleUpdate = (e) => {
    dispath(SetUpdate("Update user"));
    setUpdate(false);
    const user_id = e.target.attributes[1].nodeValue;
    let arr = user.filter((value) => value.Username === user_id);
    dispath(DataUpdate(arr));
  };
  useEffect(() => {
    Get("/user/all").then((res) => {
      const arr = res.lecturers
        .map((value) => {
          if (value.IdRole !== "Admin") {
            return createData(
              value.IdLecturer,
              value.FirstName + " " + value.LastName,
              value.IdDepartment,
              value.Department,
              value.IdRole,
              value.Username
            );
          }else{
            return false
          }
        })
        .filter((value) => {
          return value;
        });
      setUser([...arr]);
    });
  }, [props.hide]);
  
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
                        className="flex justify-center cursor-pointer "
                        onClick={handleUpdate}
                        username={row.Username}
                      >
                        <GrUpdate
                          color="#0a7a0a"
                          className="pointer-events-none"
                          fontSize={16}
                        ></GrUpdate>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div
                        className="flex justify-center cursor-pointer"
                        onClick={clickDelete}
                        username={row.Username}
                      >
                        <AiFillCloseCircle
                          color="#eb4f04"
                          className="pointer-events-none"
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
                        username={row.Username}
                      >
                        <GrUpdate
                          color="#0a7a0a"
                          className="pointer-events-none"
                          fontSize={14}
                        ></GrUpdate>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div
                        className="cursor-pointer"
                        onClick={clickDelete}
                        username={row.Username}
                      >
                        <AiFillCloseCircle
                          color="#eb4f04"
                          className="pointer-events-none"
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
