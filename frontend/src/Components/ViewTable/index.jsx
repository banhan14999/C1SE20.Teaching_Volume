import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import classNames from "classnames/bind";
import  StyledTableCell from "../StyledTableCell";
import styles from "./viewtable.module.scss";
import { useRef, useEffect, useState } from "react";
import { ApiTeachingVolume } from "../../apis/axios";
const cx = classNames.bind(styles);

function ViewTable({ year, semester, yearLabel }) {
  const reftableview = useRef();
  const [workload, setWorkload] = React.useState([]);
  const [total, setTotal] = useState({
    Teaching1: 0,
    guide1: 0,
    gradingPaper1: 0,
    examQuestions1: 0,
    examSupervisor1: 0,
    facultyActivities1: 0,
    academicAdvisor1: 0,
    total1: 0,
    Teaching2: 0,
    guide2: 0,
    gradingPaper2: 0,
    examQuestions2: 0,
    examSupervisor2: 0,
    facultyActivities2: 0,
    academicAdvisor2: 0,
    total2: 0,
    Teaching3: 0,
    guide3: 0,
    gradingPaper3: 0,
    examQuestions3: 0,
    examSupervisor3: 0,
    academicAdvisor3: 0,
    total3: 0,
    Teaching: 0,
    guide: 0,
    gradingPaper: 0,
    examQuestions: 0,
    examSupervisor: 0,
    facultyActivities: 0,
    academicAdvisor: 0,
    totalvolume: 0,
    TimeScientificVolume: 0,
  });
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
  function createRow(
    id,
    mAGV1,
    firtName1,
    lastName1,
    Teaching1,
    guide1,
    gradingPaper1,
    examQuestions1,
    examSupervisor1,
    facultyActivities1,
    academicAdvisor1,
    total1,
    Teaching2,
    guide2,
    gradingPaper2,
    examQuestions2,
    examSupervisor2,
    facultyActivities2,
    academicAdvisor2,
    total2,
    Teaching3,
    guide3,
    gradingPaper3,
    examQuestions3,
    examSupervisor3,
    academicAdvisor3,
    total3,
    obj,
    TimeScientificVolume1,
    TimeScientificVolume2,
    TimeScientificVolume3
  ) {
    return {
      id,
      mAGV1,
      firtName1,
      lastName1,
      Teaching1,
      guide1,
      gradingPaper1,
      examQuestions1,
      examSupervisor1,
      facultyActivities1,
      academicAdvisor1,
      total1,
      Teaching2,
      guide2,
      gradingPaper2,
      examQuestions2,
      examSupervisor2,
      facultyActivities2,
      academicAdvisor2,
      total2,
      Teaching3,
      guide3,
      gradingPaper3,
      examQuestions3,
      examSupervisor3,
      academicAdvisor3,
      total3,
      ...(obj || 0),
      TimeScientificVolume1,
      TimeScientificVolume2,
      TimeScientificVolume3,
    };
  }
  function sumTotalVolumn(arr) {
    const sum = arr.reduce(
      (arr1, obj) => {
        return {
          ...arr1,
          Teaching: arr1["Teaching"] + Number(obj["TeachingVolume"]),
          guide: arr1["guide"] + Number(obj["ProjectVolume"]),
          gradingPaper: arr1["gradingPaper"] + Number(obj["GradingVolume"]),
          examQuestions:
            arr1["examQuestions"] + Number(obj["ExamMonitorVolume"]),
          examSupervisor: arr1["examSupervisor"] + Number(obj["ExamVolume"]),
          facultyActivities:
            arr1["facultyActivities"] + Number(obj["ActivitiesVolume"]),
          academicAdvisor:
            arr1["academicAdvisor"] + Number(obj["AdvisorVolume"]),
          total: arr1["total"] + Number(obj["TotalVolume"]),
          TimeScientificVolume:
            arr1["TimeScientificVolume"] + Number(obj["TimeScientificVolume"]),
        };
      },
      {
        Teaching: 0,
        guide: 0,
        gradingPaper: 0,
        examQuestions: 0,
        examSupervisor: 0,
        facultyActivities: 0,
        academicAdvisor: 0,
        total: 0,
        TimeScientificVolume: 0,
      }
    );
    return sum;
  }
  useEffect(() => {
    if (year) {
      ApiTeachingVolume.Get(`volume/fulltotalByDean/year/${year}`).then(
        (res) => {
          const arr = res.totalVols.map((e, index) => {
            return createRow(
              index,
              e[0].IdLecturer,
              e[0].FirstName,
              e[0].LastName,
              e[0].TeachingVolume,
              e[0].ProjectVolume,
              e[0].GradingVolume,
              e[0].ExamMonitorVolume,
              e[0].ExamVolume,
              e[0].ActivitiesVolume,
              e[0].AdvisorVolume,
              e[0].TotalVolume,
              e[1].TeachingVolume,
              e[1].ProjectVolume,
              e[1].GradingVolume,
              e[1].ExamMonitorVolume,
              e[1].ExamVolume,
              e[1].ActivitiesVolume,
              e[1].AdvisorVolume,
              e[1].TotalVolume,
              e[2].TeachingVolume,
              e[2].ProjectVolume,
              e[2].GradingVolume,
              e[2].ExamMonitorVolume,
              e[2].ExamVolume,
              e[2].AdvisorVolume,
              e[2].TotalVolume,
              sumTotalVolumn(e),
              e[0].TimeScientificVolume,
              e[1].TimeScientificVolume,
              e[2].TimeScientificVolume
            );
          });
          const totalvolumes = arr.reduce(
            (arr1, obj) => {
              return {
                ...arr1,
                Teaching1: arr1["Teaching1"] + Number(obj["Teaching1"]),
                guide1: arr1["guide1"] + Number(obj["guide1"]),
                gradingPaper1:
                  arr1["gradingPaper1"] + Number(obj["gradingPaper1"]),
                examQuestions1:
                  arr1["examQuestions1"] + Number(obj["examQuestions1"]),
                examSupervisor1:
                  arr1["examSupervisor1"] + Number(obj["examSupervisor1"]),
                facultyActivities1:
                  arr1["facultyActivities1"] +
                  Number(obj["facultyActivities1"]),
                academicAdvisor1:
                  arr1["academicAdvisor1"] + Number(obj["academicAdvisor1"]),
                total1: arr1["total1"] + Number(obj["total1"]),

                Teaching2: arr1["Teaching2"] + Number(obj["Teaching2"]),
                guide2: arr1["guide2"] + Number(obj["guide2"]),
                gradingPaper2:
                  arr1["gradingPaper2"] + Number(obj["gradingPaper2"]),
                examQuestions2:
                  arr1["examQuestions2"] + Number(obj["examQuestions2"]),
                examSupervisor2:
                  arr1["examSupervisor2"] + Number(obj["examSupervisor2"]),
                facultyActivities2:
                  arr1["facultyActivities2"] +
                  Number(obj["facultyActivities2"]),
                academicAdvisor2:
                  arr1["academicAdvisor2"] + Number(obj["academicAdvisor2"]),
                total2: arr1["total2"] + Number(obj["total2"]),

                Teaching3: arr1["Teaching3"] + Number(obj["Teaching3"]),
                guide3: arr1["guide3"] + Number(obj["guide3"]),
                gradingPaper3:
                  arr1["gradingPaper3"] + Number(obj["gradingPaper3"]),
                examQuestions3:
                  arr1["examQuestions3"] + Number(obj["examQuestions3"]),
                examSupervisor3:
                  arr1["examSupervisor3"] + Number(obj["examSupervisor3"]),
                academicAdvisor3:
                  arr1["academicAdvisor3"] + Number(obj["academicAdvisor3"]),
                total3: arr1["total3"] + Number(obj["total3"]),
                Teaching: arr1["Teaching"] + Number(obj["Teaching"]),
                guide: arr1["guide"] + Number(obj["guide"]),
                gradingPaper:
                  arr1["gradingPaper"] + Number(obj["gradingPaper"]),
                examQuestions:
                  arr1["examQuestions"] + Number(obj["examQuestions"]),
                examSupervisor:
                  arr1["examSupervisor"] + Number(obj["examSupervisor"]),
                facultyActivities:
                  arr1["facultyActivities"] + Number(obj["facultyActivities"]),
                academicAdvisor:
                  arr1["academicAdvisor"] + Number(obj["academicAdvisor"]),
                totalvolume: arr1["totalvolume"] + Number(obj["total"]),
                TimeScientificVolume:
                  arr1["TimeScientificVolume"] +
                  Number(obj["TimeScientificVolume1"]) +
                  Number(obj["TimeScientificVolume2"]) +
                  Number(obj["TimeScientificVolume3"]),
              };
            },
            {
              Teaching1: 0,
              guide1: 0,
              gradingPaper1: 0,
              examQuestions1: 0,
              examSupervisor1: 0,
              facultyActivities1: 0,
              academicAdvisor1: 0,
              total1: 0,
              Teaching2: 0,
              guide2: 0,
              gradingPaper2: 0,
              examQuestions2: 0,
              examSupervisor2: 0,
              facultyActivities2: 0,
              academicAdvisor2: 0,
              total2: 0,
              Teaching3: 0,
              guide3: 0,
              gradingPaper3: 0,
              examQuestions3: 0,
              examSupervisor3: 0,
              total3: 0,
              academicAdvisor3: 0,
              Teaching: 0,
              guide: 0,
              gradingPaper: 0,
              examQuestions: 0,
              examSupervisor: 0,
              facultyActivities: 0,
              academicAdvisor: 0,
              totalvolume: 0,
              TimeScientificVolume: 0,
            }
          );
          setWorkload([...arr]);
          setTotal(totalvolumes);
        }
      );
    }
  }, [year]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - workload.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="container">
      <div className={`${cx("tableview")}`} id="print" ref={reftableview}>
        <h1
          className="text-center font-bold text-[30px] text-red-800 leading-[80px]"
          id="workload"
        >
          Quản lý khối lượng công việc
        </h1>
        <TableContainer
          component={Paper}
          // style={{
          //   overflowX: "auto",
          //   boxShadow: "none",
          //   // overflowY: "scroll",
          //   maxHeight: "450px",
          // }}
        >
          <Table size="small">
            <TableHead style={{ backgroundColor: "#afafaf" }}>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  STT
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  MA GIANG VIEN
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={3} colSpan={2}>
                  HỌ&nbsp;VÀ TÊN
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={8}>
                  HỌC KÌ I
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={8}>
                  HỌC KÌ II
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={6}>
                  HỌC KÌ HÈ {year - 1 + "-" + year}
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={8}>
                  NĂM HỌC {yearLabel}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  rowSpan={2}
                  style={{
                    backgroundColor: "rgba(195,232,17,0.7)",
                    color: "black",
                  }}
                >
                  GIỜ NCKH
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  colSpan={2}
                  rowSpan={2}
                  style={{
                    backgroundColor: "rgba(128,121,214,0.5)",
                    color: "black",
                  }}
                >
                  TỔNG CỘNG
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">GIẢNG DẠY</StyledTableCell>
                <StyledTableCell align="center">HƯỚNG DẪN</StyledTableCell>
                <StyledTableCell align="center">CHẤM BÀI</StyledTableCell>
                <StyledTableCell align="center">ĐỀ THI</StyledTableCell>
                <StyledTableCell align="center">COI THI</StyledTableCell>
                <StyledTableCell align="center">SINH HOẠT KHOA</StyledTableCell>
                <StyledTableCell align="center">CỐ VẤN HT</StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    backgroundColor: "rgba(223,208,168,0.5)",
                    color: "black",
                  }}
                >
                  TỔNG HỌC KÌ I
                </StyledTableCell>

                <StyledTableCell align="center">GIẢNG DẠY</StyledTableCell>
                <StyledTableCell align="center">HƯỚNG DẪN</StyledTableCell>
                <StyledTableCell align="center">CHẤM BÀI</StyledTableCell>
                <StyledTableCell align="center">ĐỀ THI</StyledTableCell>
                <StyledTableCell align="center">COI THI</StyledTableCell>
                <StyledTableCell align="center">SINH HOẠT KHOA</StyledTableCell>
                <StyledTableCell align="center">CỐ VẤN HT</StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    backgroundColor: "rgba(223,208,168,0.5)",
                    color: "black",
                  }}
                >
                  TỔNG HỌC KÌ II
                </StyledTableCell>

                <StyledTableCell align="center">GIẢNG DẠY</StyledTableCell>
                <StyledTableCell align="center">HƯỚNG DẪN</StyledTableCell>
                <StyledTableCell align="center">CHẤM BÀI</StyledTableCell>
                <StyledTableCell align="center">ĐỀ THI</StyledTableCell>
                <StyledTableCell align="center">COI THI</StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    backgroundColor: "rgba(223,208,168,0.5)",
                    color: "black",
                  }}
                >
                  TỔNG HỌC KÌ HÈ
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    backgroundColor: "rgba(128,121,214,0.5)",
                    color: "black",
                  }}
                  // width="20px"
                >
                  GIỜ ĐỨNG LỚP
                </StyledTableCell>

                <StyledTableCell align="center">GIẢNG DẠY</StyledTableCell>
                <StyledTableCell align="center">HƯỚNG DẪN</StyledTableCell>
                <StyledTableCell align="center">CHẤM BÀI</StyledTableCell>
                <StyledTableCell align="center">ĐỀ THI</StyledTableCell>
                <StyledTableCell align="center">COI THI</StyledTableCell>
                <StyledTableCell align="center">SINH HOẠT KHOA</StyledTableCell>
                <StyledTableCell align="center">CỐ VẤN HT</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? workload.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : workload
              ).map((row, index) => (
                <TableRow key={row.mAGV1}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.mAGV1 || 0}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ borderRight: "none" }}
                    className={cx("tablecell")}
                    colSpan={2}
                  >
                    {row.firtName1 + " " + row.lastName1 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Teaching1 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.guide1 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.gradingPaper1 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examQuestions1 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examSupervisor1 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.facultyActivities1 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.academicAdvisor1 || 0}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                  >
                    {row.total1 || 0}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.Teaching2 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.guide2 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.gradingPaper2 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examQuestions2 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examSupervisor2 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.facultyActivities2 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.academicAdvisor2 || 0}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                  >
                    {row.total2 || 0}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.Teaching3 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.guide3 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.gradingPaper3 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examQuestions3 || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examSupervisor3 || 0}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                  >
                    {row.total3 || 0}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(128,121,214,0.5)" }}
                  >
                    {row.Teaching.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Teaching.toFixed(2) || 0}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.guide.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.gradingPaper.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examQuestions.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examSupervisor.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.facultyActivities.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.academicAdvisor.toFixed(2) || 0}
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(195,232,17,0.7)" }}
                  >
                    {row.TimeScientificVolume.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(128,121,214,0.5)" }}
                  >
                    {row.total.toFixed(2) || 0}
                  </StyledTableCell>
                </TableRow>
              ))}
              <TableRow>
                <StyledTableCell colSpan={4} align="center">
                  Tổng:
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.Teaching1.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.guide1.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.gradingPaper1.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.examQuestions1.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.examSupervisor1.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.facultyActivities1.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.academicAdvisor1.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                >
                  {total.total1.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.Teaching2.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.guide2.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.gradingPaper2.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.examQuestions2.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.examSupervisor2.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.facultyActivities2.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.academicAdvisor2.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                >
                  {total.total2.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.Teaching3.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.guide3.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.gradingPaper3.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.examQuestions3.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.examSupervisor3.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                >
                  {total.total3.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(128,121,214,0.5)" }}
                >
                  {total.Teaching.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.Teaching.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.guide.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.gradingPaper.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.examQuestions.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.examSupervisor.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.facultyActivities.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {total.academicAdvisor.toFixed(2) || 0}
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(195,232,17,0.7)" }}
                >
                  {total.TimeScientificVolume.toFixed(2) || 0}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(128,121,214,0.5)" }}
                >
                  {total.totalvolume.toFixed(2) || 0}
                </StyledTableCell>
              </TableRow>
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  count={workload.length}
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
        <div
          id="printsig"
          className="w-[1123px] justify-around text-center hidden"
        >
          <div>
            <h2>TP. PHÒNG ĐÀO TẠO ĐẠI HỌC & SAU ĐẠI HỌC</h2>
            <p>&nbsp;</p>
          </div>
          <div>
            <h2>HIỆU TRƯỞNG/ VIỆN TRƯỞNG</h2>
            <p>(Ký và ghi rõ họ tên)</p>
          </div>
          <div>
            <p>Đà Nẵng,Ngày..... Tháng..... Năm 20... </p>
            <h2>TRƯỞNG KHOA</h2>
            <p>(Ký và ghi rõ họ tên)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTable;
