import {useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import AddYear from "../../Form/AddYear"
import StyledTableCell from "../../StyledTableCell";
import { ApiTeachingVolume } from "../../../apis/axios";
import { useState } from "react";
import {FcDeleteRow} from "react-icons/fc"
import FloatBox from "../../FloatBox";
function ManagerYear(props) {
  const [year,setYear]= useState([])
    const [confirm, setConfirm] = useState(false);
    const [idDelete, setIdDelete] = useState();
const param = useParams();
  function createData(Id, Start, Finish, CreatedAdd, UpdatedAdd) {
    return { Id, Start, Finish, CreatedAdd, UpdatedAdd };
  }
function handleDelete(e){
  const yearid = e.target.dataset.delete;
    setConfirm(true);
    setIdDelete(yearid);
}
function handleClickConfirm(yearid) {
   ApiTeachingVolume.Delete(`/year/delete/${yearid}`);
   const arr = year.filter((value) => value.Start !== Number(yearid));
   setYear([...arr]);
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
            Manage Year
          </div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow style={{}}>
                  <StyledTableCell align="center">Start</StyledTableCell>
                  <StyledTableCell align="center">Finish</StyledTableCell>
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
                    <StyledTableCell align="center">
                      {row.Start}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Finish}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div
                        className="flex justify-center cursor-pointer"
                        data-delete={row.Start}
                        onClick={handleDelete}
                      >
                        <FcDeleteRow
                          color="#eb4f04"
                          fontSize={22}
                          className="pointer-events-none"
                        ></FcDeleteRow>
                      </div>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {confirm && (
            <FloatBox
              handleClickConfirm={() => {
                handleClickConfirm(idDelete);
              }}
              setConfirm={setConfirm}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ManagerYear;
