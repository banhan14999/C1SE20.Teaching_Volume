import { useState } from "react";
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
import { SetUpdate, DataUpdate } from "../../../Redux/Actions/index";
import { Get,Delete } from "../../../axios";
import { useLayoutEffect } from "react";

function ManagerSubject(props) {
  console.log(props.hide);
  const dispath = useDispatch();
  const [update, setUpdate] = useState(true);
  const [sub, setSub] = useState([]);

  function click(e) {
    const Subject_id = e.target.attributes[1].nodeValue 
    Delete("/subject/delete/", Subject_id);
    const arr = sub.filter((value) => {
      return value.Subject_id !== parseInt(Subject_id);
    });
    setSub(arr);
  }

  function createData(Code, Subject, Credit, Type, Subject_id) {
    return { Code, Subject, Credit, Type, Subject_id };
  }

  const handleUpdate = (e) => {
    dispath(SetUpdate("Update subject"));
    setUpdate(false);
    const Subject_id = e.target.parentElement.attributes[1].nodeValue;
    let arr = sub.filter((value) => value.Subject_id === parseInt(Subject_id));
    arr[0]["Subject_id"] = Subject_id;
    dispath(DataUpdate(arr));
  };

  useLayoutEffect(() => {
    const subjectData = Get("/subject/all");
    subjectData.then((data) => {
      const subjects = data.subjects.map((value) => {
        return createData(
          value.Letter + " " + value.Number,
          value.SubjectName,
          value.Credit,
          value.Type,
          value.IdSubject
        );
      });
      setSub([...subjects]);
    });
  }, [props.hide]);

  return (
    <div>
      {update ? (
        <div className={`container`}>
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Subject
          </div>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="Manager Subject Table">
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
                      <div className="flex justify-around items-center">
                        <div
                          className="flex justify-center items-center cursor-pointer mr-1"
                          sub_id={row.Subject_id}
                          onClick={handleUpdate}
                        >
                          <GrUpdate
                            color="#0a7a0a"
                            className="mr-[2px]"
                            fontSize={12}
                          ></GrUpdate>
                          <span>Update</span>
                        </div>
                        <div
                          className="flex justify-center items-center cursor-pointer ml-1"
                          onClick={click}
                          sub_id={row.Subject_id}
                        >
                          <AiFillCloseCircle
                            color="#eb4f04"
                            className="mr-[2px] pointer-events-none"
                            fontSize={12}
                          ></AiFillCloseCircle>
                          <span className="pointer-events-none">Delete</span>
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
            <Table size="small" aria-label="Manager Subject Table">
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
                      <div className="flex justify-around items-center">
                        <div
                          className="flex justify-center items-center cursor-pointer mr-1"
                          sub_id={row.Subject_id}
                          onClick={handleUpdate}
                        >
                          <GrUpdate
                            color="#0a7a0a"
                            className="mr-[2px]"
                            fontSize={12}
                          ></GrUpdate>
                          <span>Update</span>
                        </div>
                        <div
                          className="flex justify-center items-center cursor-pointer ml-1"
                          onClick={click}
                          sub_id={row.Subject_id}
                        >
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
      )}
    </div>
  );
}

export default ManagerSubject;
