import { useEffect, useState } from "react";
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
import FechApi from "../../../fectch";

function ManagerSubject(props) {
  const dispath = useDispatch();
  const [update, setUpdate] = useState(true);
  const [sub, setSub] = useState([]);

  function createData(Code, Subject, Credit, Type) {
    return { Code, Subject, Credit, Type };
  }

  const handleUpdate = () => {
    dispath(SetUpdate("Update subject"));
    setUpdate(false);
  };
  useEffect(() => {
    const api = "http://127.0.0.1:8000/api/subjects";
    FechApi(api).then((data) => {
      let subjects = data.subjects.map((value) => {
        return createData(
          value.Letter + " " + value.Number,
          value.Subject_name,
          value.Credit,
          value.Type,
        );
      });
      console.log(data.subjects);
      setSub([...subjects]);
    });
  }, []);
  return (
    <div>
      {update ? (
        <div className="container">
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Subject
          </div>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="Manager Subject Table">
              <TableHead>
                <TableRow style={{}}>
                  <StyledTableCell align="center">Code</StyledTableCell>
                  <StyledTableCell align="center" >Subject</StyledTableCell>
                  <StyledTableCell align="center">Credit</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sub.map((row) => (
                  <TableRow
                    key={row.Code}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.Code}
                    </StyledTableCell>
                    <StyledTableCell size="small">
                      {row.Subject}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Credit}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.Type}</StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="flex justify-between items-center">
                        <div
                          className="flex justify-center items-center cursor-pointer mr-1"
                          onClick={handleUpdate}
                        >
                          <GrUpdate
                            color="#0a7a0a"
                            className="mr-[2px]"
                            fontSize={12}
                          ></GrUpdate>
                          <span>Update</span>
                        </div>
                        <div className="flex justify-center items-center cursor-pointer ml-1">
                          <AiFillCloseCircle
                            color="#eb4f04"
                            className="mr-[2px]"
                            fontSize={12}
                          ></AiFillCloseCircle>
                          <span>Detail</span>
                        </div>
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
            <Table size="medium" aria-label="Manager Subject table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Code</StyledTableCell>
                  <StyledTableCell align="center">Subject</StyledTableCell>
                  <StyledTableCell align="center">Credit</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sub.map((row) => (
                  <TableRow
                    key={row.Code}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.Code}
                    </StyledTableCell>
                    <StyledTableCell>{row.Subject}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Credit}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.Type}</StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="flex justify-between items-center">
                        <div
                          className="flex justify-center items-center cursor-pointer mr-1"
                          onClick={handleUpdate}
                        >
                          <GrUpdate
                            color="#0a7a0a"
                            className="mr-2"
                            fontSize={14}
                          ></GrUpdate>
                          <span>Update</span>
                        </div>

                        <div className="flex justify-center items-center cursor-pointer ml-1">
                          <AiFillCloseCircle
                            color="#eb4f03"
                            className="mr-2"
                            fontSize={16}
                          ></AiFillCloseCircle>
                          <span>Detail</span>
                        </div>
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
