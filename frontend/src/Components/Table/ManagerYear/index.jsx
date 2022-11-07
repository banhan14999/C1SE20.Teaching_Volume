import {useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AiFillCloseCircle } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import AddYear from "../../Form/AddYear"
import StyledTableCell from "../../StyledTableCell";
import { SetUpdate } from "../../../Redux/Actions/index";
import { ApiTeachingVolume } from "../../../apis/axios";
import { useState } from "react";
function ManagerYear(props) {
  const [year,setYear]= useState([])
const param = useParams();
const navigate = useNavigate();
  const dispath = useDispatch();
  function createData(Id, Start, Finish, CreatedAdd, UpdatedAdd) {
    return { Id, Start, Finish, CreatedAdd, UpdatedAdd };
  }

  const handleUpdate = (e) => {
     dispath(SetUpdate("Update Year"));
        const yearid = e.target.parentElement.dataset.update;
        const id = yearid.toLowerCase().split("").filter((value) => value !== " ")
          .join("")
          .toLowerCase();
        navigate(id);
  };
function handleDelete(e){
  const yearid = e.target.dataset.delete;
    ApiTeachingVolume.Delete(`/year/delete/${yearid}`)
    const arr = year.filter((value) => value.Start !== Number(yearid));
    setYear([...arr])
}
  useEffect(()=>{
    ApiTeachingVolume.Get("/year/all")
    .then((req)=>{
      const arr = req.years.map((value)=>{
       return createData(
         value.start,
         value.start,
         value.finish,
         new Date(value.created_at).toLocaleDateString("en-US"),
         new Date(value.updated_at).toLocaleDateString("en-US")
       ); 
      })
      setYear([...arr])
    })
  },[])
  return (
    <div>
      {param.id ? (
        <AddYear hide="hidden" btn="Update" title="Updata Year"></AddYear>
      ) : (
        <div className="container">
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Year
          </div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
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
                {year.map((row) => (
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
                        data-update={row.Id}
                        onClick={handleUpdate}
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
                        className="flex justify-center cursor-pointer"
                        data-delete={row.Start}
                        onClick={handleDelete}
                      >
                        <AiFillCloseCircle
                          color="#eb4f04"
                          fontSize={16}
                          className="pointer-events-none"
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

export default ManagerYear;
