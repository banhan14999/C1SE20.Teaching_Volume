import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../StyledTableCell";
import { GrUpdate } from "react-icons/gr";
import { TbListDetails } from "react-icons/tb";
import ClassInformation from "../../Form/ClassInformation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SetUpdate } from "../../../Redux/Actions/index";

function ManagerClass(props) {
  const dispath = useDispatch();
  const [update, setUpdate] = useState(true);
  const handleUpdate = () => {
    dispath(SetUpdate("Update class"));
    setUpdate(false);
  };

  function createData(
    ClassID,
    ClassName,
    SchoolYear,
    Semester,
    Student,
    Lecturer
  ) {
    return { ClassID, ClassName, SchoolYear, Semester, Student, Lecturer };
  }

  const rows = [
    createData("2223CMU SE 403-1", "CMU-SE 403 AIS", 2022, 1, 40, "NĐM"),
    createData("2223CMU SE 403-2", "CMU-SE 403 AIS", 2022, 1, 40, "NĐM"),
  ];
  return (
    <div>
      {update === true ? (
        <div className="container">
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Classs
          </div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ClassID</StyledTableCell>
                  <StyledTableCell align="center">ClassName</StyledTableCell>
                  <StyledTableCell align="center">SchoolYear</StyledTableCell>
                  <StyledTableCell align="center">Semester</StyledTableCell>
                  <StyledTableCell align="center">Student</StyledTableCell>
                  <StyledTableCell align="center">Lecturer</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.ClassID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.ClassID}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.ClassName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.SchoolYear}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Semester}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Student}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Lecturer}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={handleUpdate}
                      >
                        <GrUpdate className="mr-2"></GrUpdate>
                        <div>Update</div>
                      </div>
                      <div className="flex items-center cursor-pointer">
                        <TbListDetails className="mr-2"></TbListDetails>
                        <div>Detail</div>
                      </div>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : props.hide === "Update class" ? (
        <ClassInformation
          btn="Update"
          disabled={true}
          title="Updata Information"
        />
      ) : (
        <div className="container">
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Classs
          </div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ClassID</StyledTableCell>
                  <StyledTableCell align="center">ClassName</StyledTableCell>
                  <StyledTableCell align="center">SchoolYear</StyledTableCell>
                  <StyledTableCell align="center">Semester</StyledTableCell>
                  <StyledTableCell align="center">Student</StyledTableCell>
                  <StyledTableCell align="center">Lecturer</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.ClassID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.ClassID}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.ClassName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.SchoolYear}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Semester}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Student}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Lecturer}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={handleUpdate}
                      >
                        <GrUpdate className="mr-2"></GrUpdate>
                        <div>Update</div>
                      </div>
                      <div className="flex items-center cursor-pointer">
                        <TbListDetails className="mr-2"></TbListDetails>
                        <div>Detail</div>
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

export default ManagerClass;
