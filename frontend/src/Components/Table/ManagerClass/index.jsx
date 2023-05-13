import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { TbListDetails } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./class.module.scss";
import classNames from "classnames/bind";
import StyledTableCell from "../../StyledTableCell";
import ClassInformation from "../../Form/ClassInformation";
import { useEffect, useLayoutEffect, useState } from "react";
import { ApiTeachingVolume } from "../../../apis/axios";
import { DataUpdate } from "../../../Redux/Actions/index";
import SelectForm from "../../SelectForm";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import FloatBox from "../../FloatBox";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TablePagination from "@mui/material/TablePagination";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
const cx = classNames.bind(styles);
function ManagerClass() {
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
  const [classad, setClassAd] = useState([]);
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
 const [confirm, setConfirm] = useState(false);
 const [idDelete, setIdDelete] = useState();

  const param = useParams();
  const navigate = useNavigate();
  const dispath = useDispatch();

  const idlec = JSON.parse(localStorage.getItem("IdLecturer"));
  const ad = JSON.parse(localStorage.getItem("Admin"));

  const opt = [
    { value: "2021", label: "2021-2022" },
    { value: "2022", label: "2022-2023" },
  ];
  const hocki = [
    { value: "1", label: "Học Kỳ I" },
    { value: "2", label: "Học Kỳ II" },
    { value: "3", label: "Học Kỳ Hè" },
  ];

  const handleUpdate = (e) => {
    // update và đẩy dữ liệu của classinformation
    const classid = e.target.dataset.update;
    let arr = data.filter((value) => value.IdClass === classid);
    setTitle("");
    dispath(DataUpdate(arr));
    navigate(classid);
  };
  function handleDetail(e) {
    // xem chi tiết của từng lớp
    const classid = e.target.dataset.detail;
    if (e.target.textContent === "Detail") {
      setTitle("Cập nhật lớp học");
      dispath(DataUpdate(data));
      navigate(classid);
    }
  }
 
  function handleDelete(e) {
    const classid = e.target.dataset.delete;
    setConfirm(true);
    setIdDelete(classid);
  }

  function handleClickConfirm(classid) {
    ApiTeachingVolume.Delete("/class/delete/", classid);
    const arr = classad.filter((value) => {
      return value.ClassID !== classid;
    });
    setClassAd(arr);
  }
  function createData(
    ClassID,
    ClassName,
    Subject,
    Year,
    Semester,
    Student,
    Type,
    Credit,
    Coefficient
  ) {
    return {
      ClassID,
      ClassName,
      Subject,
      Year,
      Semester,
      Student,
      Type,
      Credit,
      Coefficient
    };
  }

  useEffect(() => {
    // đẩy year semester lên local
    if (year !== null && semester !== null) {
      localStorage.setItem(
        "year",
        JSON.stringify({ year: year.value, semester: semester.value })
      );
    }
  }, [semester, year]);

  useLayoutEffect(() => {
    // get all user (admin)
    // get từng học kì của năm (lecturer)
    if ((semester && semester.value && year && year.value) || ad) {
      const str =
        !ad &&
        `class/lecturer/${idlec}/semester/${semester.value}/year/${year.value}`;
      ApiTeachingVolume.Get(str || "class/all").then((req) => {
        setData([...req.classes]);
        const arr = req.classes
          .map((value) => {
            return createData(
              value.IdClass,
              value.Letter + " " + value.Number + " " + value.Grade,
              value.SubjectName,
              value.Year,
              value.Semester,
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
  }, [year, semester, ad, idlec, param.id]);


  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(5);

 // Avoid a layout jump when reaching the last page with empty rows.
 const emptyRows =
   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - classad.length) : 0;

 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };
 
  return (
    <div>
      {param.id ? (
        <ClassInformation btn="Cập nhật" disabled={true} title={title} />
      ) : (
        <div className="container">
          {!ad && (
            <div className={cx("option")}>
              <div className="flex pt-[14%] justify-around">
                <span className="w-[30%] ml-[50px]">
                  <SelectForm
                    options={opt}
                    placeholder="Chọn năm học"
                    height="34px"
                    setSelectedOption={setYear}
                    // defaultValue={
                    //   years && years.year && selectValue(years.year, opt)
                    // }
                  ></SelectForm>
                </span>
                <span className="w-[30%] ml-[-30px]">
                  <SelectForm
                    options={hocki}
                    placeholder="Chọn học kỳ"
                    height="34px"
                    setSelectedOption={setSemester}
                    // defaultValue={
                    // years &&
                    // years.semester &&
                    // years &&
                    // years.year &&
                    // selectValue(years.semester, hocki)
                    // }
                  ></SelectForm>
                </span>
              </div>
            </div>
          )}
          {classad.length > 0 && (ad || (year && semester)) && (
            <>
              <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
                Quản lý lớp học
              </div>
              <TableContainer component={Paper}>
                <Table size="medium" aria-label="a dense table">
                  <TableHead style={{ backgroundColor: "#afafaf" }}>
                    <TableRow>
                      <StyledTableCell align="center">
                        Tên lớp
                      </StyledTableCell>
                      <StyledTableCell align="center">Môn học</StyledTableCell>
                      <StyledTableCell align="center">Năm</StyledTableCell>
                      <StyledTableCell align="center">Học kì</StyledTableCell>
                      <StyledTableCell align="center">Sinh viên</StyledTableCell>
                      <StyledTableCell align="center">Loại</StyledTableCell>
                      <StyledTableCell align="center">Tín chỉ</StyledTableCell>
                      <StyledTableCell align="center">
                        Hệ số môn học
                      </StyledTableCell>
                      <StyledTableCell align="center">Hành động</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? classad.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : classad
                    ).map((row) => (
                      <TableRow
                        key={row.ClassID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.ClassName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.Subject}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.Year}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.Semester}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.Student}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.Type}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.Credit}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.Coefficient}
                        </StyledTableCell>
                        <StyledTableCell>
                          <div
                            className="flex items-center cursor-pointer "
                            data-update={row.ClassID}
                            onClick={handleUpdate}
                          >
                            <BiEdit className="mr-2 pointer-events-none"></BiEdit>
                            <div className="pointer-events-none">Cập nhật</div>
                          </div>
                          <div
                            className="flex items-center cursor-pointer"
                            data-detail={row.ClassID}
                            onClick={handleDetail}
                          >
                            <TbListDetails className="mr-2 pointer-events-none"></TbListDetails>
                            <div className="pointer-events-none">Chi tiết</div>
                          </div>
                          {ad && (
                            <div
                              className="flex items-center cursor-pointer"
                              data-delete={row.ClassID}
                              onClick={handleDelete}
                            >
                              <TiDeleteOutline className="mr-2 pointer-events-none"></TiDeleteOutline>
                              <div className="pointer-events-none">Xóa</div>
                            </div>
                          )}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={3}
                        count={classad.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </>
          )}
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

export default ManagerClass;
