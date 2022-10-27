import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { GrUpdate } from "react-icons/gr";
import { TbListDetails } from "react-icons/tb";
import { useParams,useNavigate } from "react-router-dom";

import StyledTableCell from "../../StyledTableCell";
import ClassInformation from "../../Form/ClassInformation";
import { SetUpdate } from "../../../Redux/Actions/index";

function ManagerClass(props) {
  const param = useParams();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const handleUpdate = (e) => {
     const classid = e.target.parentElement.dataset.update;
     const id = classid.split("")
       const text = id.filter((value) => value != " ").join("").toLowerCase()
    dispath(SetUpdate("Update class"));
    navigate(text);
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
      {param.id ? (
        <ClassInformation
          btn="Update"
          disabled={true}
          title="Updata Information"
        />
      ) : (
        <div className="container">
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Class
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
                        data-update={row.ClassID}
                        onClick={handleUpdate}
                      >
                        <GrUpdate className="mr-2"></GrUpdate>
                        <div>Update</div>
                      </div>
                      <div
                        className="flex items-center cursor-pointer"
                        data-delete={row.ClassID}
                      >
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
