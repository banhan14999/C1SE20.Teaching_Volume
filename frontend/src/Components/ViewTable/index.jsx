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
import { useRef,useEffect } from "react";
import { ApiTeachingVolume } from "../../apis/axios";
const cx = classNames.bind(styles);

function ViewTable({year,semester}) {
  const reftableview= useRef()
  const [workload,setWorkload]= React.useState([])
  
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
    id1,
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
    total1
  ) {
    return {
      id1,
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
    };
  }
 useEffect(()=>{
      if(semester&&year){
        ApiTeachingVolume.Get(`volume/totalByDean/sem/${semester}/year/${year}`)
      .then(req=>{
      const arr =   req.totalVols.map((e)=>{
          return createRow(e.id, e.IdLecturer,e.FirstName,e.LastName,e.TeachingVolume,0,e.GradingVolume,e.ExamVolume,e.ExamMonitorVolume,e.ActivitiesVolume,e.AdvisorVolume,e.TotalVolume);
        })
        setWorkload([...arr])
      })
      }
 },[semester,year])



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
        <h1 className="text-center font-bold text-[30px] text-red-800 leading-[80px]">
          Manager Workload
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
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  STT
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  MA GIANG VIEN (MYDTU)
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={3} colSpan={2}>
                  HỌ VÀ TÊN
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={8}>
                  HỌC KÌ I
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={8}>
                  HỌC KÌ II
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={7}>
                  HỌC KÌ HÈ 2020-2021
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={7}>
                  NĂM HỌC 2021-2022
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  rowSpan={2}
                  style={{ backgroundColor: "rgba(195,232,17,0.7)" }}
                >
                  GIỜ NCKH
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  colSpan={2}
                  rowSpan={2}
                  style={{ backgroundColor: "rgba(128,121,214,0.5)" }}
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
                  style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
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
                  style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
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
                  style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                >
                  TỔNG HỌC KÌ HÈ
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(128,121,214,0.5)" }}
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
              ).map((row) => (
                <TableRow key={row.id1}>
                  <StyledTableCell align="center">{row.id1}</StyledTableCell>
                  <StyledTableCell align="left">{row.mAGV1}</StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ borderRight: "none" }}
                    className={cx("tablecell")}
                  >
                    {row.firtName1}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ borderLeft: "none" }}
                  >
                    {row.lastName1}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.Teaching1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.guide1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.gradingPaper1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examQuestions1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examSupervisor1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.facultyActivities1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.academicAdvisor1}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                  >
                    {row.total1}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.Teaching}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.guide}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.gradingPaper}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examQuestions}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examSupervisor}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.facultyActivities}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.academicAdvisor}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                  >
                    {row.total}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.Teaching}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.guide}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.gradingPaper}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examQuestions}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examSupervisor}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                  >
                    {row.facultyActivities}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(128,121,214,0.5)" }}
                  >
                    {row.academicAdvisor}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.total}</StyledTableCell>

                  <StyledTableCell align="center">
                    {row.Teaching}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.guide}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.gradingPaper}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examQuestions}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.examSupervisor}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.total}</StyledTableCell>

                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(195,232,17,0.7)" }}
                  >
                    {row.total}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "rgba(128,121,214,0.5)" }}
                  >
                    {row.total}
                  </StyledTableCell>
                </TableRow>
              ))}
              <TableRow>
                <StyledTableCell colSpan={4}>Total</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">234</StyledTableCell>
                <StyledTableCell align="center">234</StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                >
                  234
                </StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">234</StyledTableCell>
                <StyledTableCell align="center">234</StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                >
                  234
                </StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(223,208,168,0.5)" }}
                >
                  234
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(128,121,214,0.5)" }}
                >
                  234
                </StyledTableCell>
                <StyledTableCell align="center">234</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">123</StyledTableCell>
                <StyledTableCell align="center">234</StyledTableCell>
                <StyledTableCell align="center">234</StyledTableCell>
                <StyledTableCell align="center">234</StyledTableCell>

                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(195,232,17,0.7)" }}
                >
                  234
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: "rgba(128,121,214,0.5)" }}
                >
                  234
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
        <div id="printsig" className="w-full justify-around text-center hidden">
          <div>
            <h2>TP. PHÒNG ĐÀO TẠO ĐẠI HỌC & SAU ĐẠI HỌC</h2>
          </div>
          <div>
            <h2>HIỆU TRƯỞNG/ VIỆN TRƯỞNG</h2>
            <p>(kí và ghi rõ họ và tên)</p>
          </div>
          <div>
            <p>Đà Nẵng,Ngày..... Tháng..... Năm 20... </p>
            <h2>HIỆU TRƯỞNG/ VIỆN TRƯỞNG</h2>
            <p>(kí và ghi rõ họ và tên)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTable;
