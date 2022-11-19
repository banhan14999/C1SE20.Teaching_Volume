import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { GrUpdate } from "react-icons/gr";
import { TbListDetails } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./class.module.scss";
import classNames from "classnames/bind";
import StyledTableCell from "../../StyledTableCell";
import ClassInformation from "../../Form/ClassInformation";
import { SetUpdate } from "../../../Redux/Actions/index";
import { useEffect, useState } from "react";
import { ApiTeachingVolume } from "../../../apis/axios";
import { DataUpdate } from "../../../Redux/Actions/index";
import SelectForm from "../../SelectForm";

const cx = classNames.bind(styles);
function ManagerClass(props) {
  const param = useParams();
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [classad, setClassAd] = useState([]);
  const [title, setTitle] = useState("");

  const [data, setData] = useState([]);
  const opt = [
    { value: "2022", label: "2021-2022" },
    { value: "2023", label: "2022-2023" },
    { value: "2024", label: "2024-2025" },
  ];
  const hocki = [
    { value: "1", label: "Học Kỳ I" },
    { value: "2", label: "Học Kỳ II" },
    { value: "3", label: "Học Hè" },
  ];
function selectValue(s,arr) {
  return arr.filter((value) => {
    return value.value === s;
  });
}
  const handleUpdate = (e) => {
    const classid = e.target.dataset.update;
    let arr = data.filter((value) => value.IdClass === classid);
    // dispath(SetUpdate("Update class"));
    setTitle("");
    dispath(DataUpdate(arr));
    navigate(classid);
  };
  function handleDelete(e) {
    const classid = e.target.dataset.delete;
    if(e.target.textContent === "Detail"){
        // dispath(SetUpdate("Detail"));
        setTitle("Detail class")
        dispath(DataUpdate(data));
        navigate(classid);
    }
  }
  
  function createData(ClassID,ClassName,Subject,Student,Type,Credit,Coefficient,Action) {
    return {ClassID, ClassName,Subject,Student,Type,Credit,Coefficient,Action};
  }

useEffect(()=>{
  if (year !== null && semester !== null) {
    localStorage.setItem(
      "year",
      JSON.stringify({ year: year.value, semester: semester.value })
    );
  }
},[year,semester])
const years = JSON.parse(localStorage.getItem("year"));
const idlec = JSON.parse(localStorage.getItem("IdLecturer"));
const ad = JSON.parse(localStorage.getItem("Admin"));

useEffect(() => {
  if (semester && semester.value && year && year.value) {
    const str = !ad &&
      `class/lecturer/${idlec}/semester/${semester.value}/year/${year.value}`;
    ApiTeachingVolume.Get(str || "class/all").then((req) => {
      setData([...req.classes]);
      const arr = req.classes
        .map((value) => {
          return createData(
            value.IdClass,
            value.Letter + " " + value.Number,
            value.SubjectName,
            value.NumberOfStudent,
            value.TypeClass,
            value.CreditClass,
            value.SubjectCoefficient
          );
        })
        .filter((value) => {
          return value;
        });
      setClassAd([...arr]);
    });
  }
}, [param.id, year, semester, ad, idlec]);
  return (
    <div className="w-[726px]">
      {param.id ? (
        <ClassInformation btn="Update" disabled={true} title={title} />
      ) : (
        <div className="container">
          <div className={cx("option")}>
            <div className="flex pt-[14%] justify-around">
              <span className="w-[30%] ml-[50px]">
                <SelectForm
                  options={opt}
                  placeholder="Chọn năm học"
                  height="30px w-full"
                  setSelectedOption={setYear}
                  defaultValue={
                    years && years.year && selectValue(years.year, opt)
                  }
                ></SelectForm>
              </span>
              <span className="w-[30%] ml-[-30px]">
                <SelectForm
                  options={hocki}
                  placeholder="Chọn học kì"
                  height="30px w-full"
                  setSelectedOption={setSemester}
                  defaultValue={
                    years &&
                    years.semester &&
                    years &&
                    years.year &&
                    selectValue(years.semester, hocki)
                  }
                ></SelectForm>
              </span>
            </div>
          </div>
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manager Class
          </div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ClassName</StyledTableCell>
                  <StyledTableCell align="center">Subject</StyledTableCell>
                  <StyledTableCell align="center">Student</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">Credit</StyledTableCell>
                  <StyledTableCell align="center">
                    Subject Coefficient
                  </StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classad.map((row) => (
                  <TableRow
                    key={row.ClassID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.ClassName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Subject}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Student}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.Type}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Credit}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Coefficient}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div
                        className="flex items-center cursor-pointer"
                        data-update={row.ClassID}
                        onClick={handleUpdate}
                      >
                        <GrUpdate className="mr-2 pointer-events-none"></GrUpdate>
                        <div className="pointer-events-none">Update</div>
                      </div>
                      <div
                        className="flex items-center cursor-pointer"
                        data-delete={row.ClassID}
                        onClick={handleDelete}
                      >
                        <TbListDetails className="mr-2 pointer-events-none"></TbListDetails>
                        <div className="pointer-events-none">Detail</div>
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
