import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AiFillCloseCircle } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import StyledTableCell from "../../StyledTableCell";
import AddUser from "../../Form/AddUser";
import { SetUpdate } from "../../../Redux/Actions/index";
// import { ApiTeachingVolume } from "../../../apis/axios";
import { DataUpdate } from "../../../Redux/Actions/index";
import axios from "axios";

function ManagerUser() {
  const param = useParams();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [user,setUser] = useState([])
  function createData(Id,IdLecturer, FullName, School, Department, Role) {
    return { Id,IdLecturer, FullName, School, Department, Role };
  }
function clickDelete(e) {
  const user_id = e.target.dataset.delete
  // ApiTeachingVolume.Delete("/user/delete/", user_id);
  const token = JSON.parse(localStorage.getItem("Token"));
  axios.delete(`http://127.0.0.1:8000/api/user/delete/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const arr = user.filter((value) => {
    return value.Id !== Number(user_id);
  });
  setUser(arr);
}
  const handleUpdate = (e) => {
    dispath(SetUpdate("Update user"));
    const user_id = e.target.dataset.update;
    let arr = user.filter((value) => value.Id === Number(user_id));
    dispath(DataUpdate(arr));
    navigate(user_id);
  };
  useEffect(() => {
     const token = JSON.parse(localStorage.getItem("Token"))
    axios
      .get("http://127.0.0.1:8000/api/user/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const arr = res.data.users
          .map((value) => {
            if (value.IdRole !== 1) {
              return createData(
                value.id,
                value.IdLecturer,
                value.FirstName + " " + value.LastName,
                value.IdFaculty,
                value.IdDepartment,
                value.IdRole
              );
            } else {
              return false;
            }
          })
          .filter((value) => {
            return value;
          });
        setUser([...arr]);
      });
  }, [param.id]);
  
  return (
    <div>
      {param.id ? (
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
                  <StyledTableCell align="center">Faculty</StyledTableCell>
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
                      {row.IdLecturer}
                    </StyledTableCell>
                    <StyledTableCell>{row.FullName}</StyledTableCell>
                    <StyledTableCell>{row.School}</StyledTableCell>
                    <StyledTableCell>{row.Department}</StyledTableCell>
                    <StyledTableCell>{row.Role}</StyledTableCell>
                    <StyledTableCell align="center">
                      <div
                        className="flex justify-center  cursor-pointer "
                        onClick={handleUpdate}
                        data-update={row.Id}
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
                        data-delete={row.Id}
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
