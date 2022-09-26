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
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { pink } from "@mui/material/colors";

import  StyledTableCell from "../StyledTableCell";
import styles from "./viewtable.module.scss";
const cx = classNames.bind(styles);

function ViewTable() {
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
    mAGV,
    firtName,
    lastName,
    Teaching,
    guide,
    gradingPaper,
    examQuestions,
    examSupervisor,
    facultyActivities,
    academicAdvisor,
    total
  ) {
    return {
      id,
      mAGV,
      firtName,
      lastName,
      Teaching,
      guide,
      gradingPaper,
      examQuestions,
      examSupervisor,
      facultyActivities,
      academicAdvisor,
      total,
    };
  }
 

  const rows = [
    createRow(
      1,
      "61191023",
      "Huỳnh bá",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      2,
      "61191023",
      "Huỳnh bá",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      3,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      4,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      5,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
    createRow(
      6,
      "61191023",
      "Huỳnh bá ",
      "diệu",
      666.0,
      0.0,
      8.0,
      1.6,
      3.0,
      3.0,
      2.0,
      68360
    ),
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [scroll, setScroll] = React.useState(false);
   const scrolltable = ()=>{
       if (window.scrollY > 300) 
       setScroll(true);
       else setScroll(false);
    }
    React.useEffect(()=>{
        window.addEventListener("scroll", scrolltable);
    },[])

  return (
    <div className={cx("tableview")}>
      <TableContainer component={Paper} style={{ overflowX: "visible" }}>
        <Table size="small" style={{ width: "auto", tableLayout: "auto" }}>
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
                width="20px"
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
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <StyledTableCell align="center">{row.id}</StyledTableCell>
                <StyledTableCell align="left">{row.mAGV}</StyledTableCell>
                <StyledTableCell
                  align="left"
                  style={{ borderRight: "none" }}
                  className={cx("tablecell")}
                >
                  {row.firtName}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ borderLeft: "none" }}
                >
                  {row.lastName}
                </StyledTableCell>

                <StyledTableCell align="center">{row.Teaching}</StyledTableCell>
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

                <StyledTableCell align="center">{row.Teaching}</StyledTableCell>
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

                <StyledTableCell align="center">{row.Teaching}</StyledTableCell>
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

                <StyledTableCell align="center">{row.Teaching}</StyledTableCell>
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
                count={rows.length}
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
      <div className="w-full flex justify-around text-center">
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
      {scroll && (
        <ArrowCircleUpIcon
          className={cx("iconrow")}
          sx={{ fontSize: 45, color: pink[500] }}
          onClick={() => {
            window.scroll(0, 0);
          }}
        />
      )}
    </div>
  );
}

export default ViewTable;
