import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { ApiTeachingVolume } from "../../apis/axios";
import { useState } from "react";

function ViewSemester({ year, semester, label }) {
  const [rows, setRows] = useState([]);
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
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: 16,
      fontWeight: "bold",
      border: "2px solid black",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: "2px solid black",
    },
  }));

  const [total, setTotal] = useState({
    TeachingVolume: 0,
    ProjectVolume:0,
    GradingVolume: 0,
    ExamMonitorVolume: 0,
    ExamVolume: 0,
    ActivitiesVolume: 0,
    AdvisorVolume: 0,
    TotalVolume: 0,
  });

  React.useEffect(() => {
    if (year && semester)
       ApiTeachingVolume.Get(
        `volume/totalByDean/sem/${semester}/year/${year}`
      ).then((req) => {
        const arr = req.totalVols.map((e, index) => {
          return createRow(
            index + 1,
            e.IdLecturer,
            e.FirstName,
            e.LastName,
            e.TeachingVolume,
            e.ProjectVolume,
            e.GradingVolume,
            e.ExamMonitorVolume,
            e.ExamVolume,
            e.ActivitiesVolume,
            e.AdvisorVolume,
            e.TotalVolume
          );
        });
        const totalvolumes = arr.reduce(
          (arr1, obj) => {
            return {
              ...arr1,
              TeachingVolume: arr1["TeachingVolume"] + Number(obj["Teaching"]),
              ProjectVolume: arr1["ProjectVolume"] + Number(obj["guide"]),
              GradingVolume:
                arr1["GradingVolume"] + Number(obj["gradingPaper"]),
              ExamMonitorVolume:
                arr1["ExamMonitorVolume"] + Number(obj["examQuestions"]),
              ExamVolume: arr1["ExamVolume"] + Number(obj["examSupervisor"]),
              ActivitiesVolume:
                arr1["ActivitiesVolume"] + Number(obj["facultyActivities"]),
              AdvisorVolume:
                arr1["AdvisorVolume"] + Number(obj["academicAdvisor"]),
              TotalVolume: arr1["TotalVolume"] + Number(obj["total"]),
            };
          },
          {
            ProjectVolume:0,
            TeachingVolume: 0,
            GradingVolume: 0,
            ExamMonitorVolume: 0,
            ExamVolume: 0,
            ActivitiesVolume: 0,
            AdvisorVolume: 0,
            TotalVolume: 0,
          }
        );
        setTotal(totalvolumes);
        setRows([...arr]);
      });
  }, [year, semester]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <div id="print" className="m-auto">
      <TableContainer component={Paper} className="w-[1123px]">
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <StyledTableCell rowSpan={2}>STT</StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                MA GIANG VIEN (MYDTU)
              </StyledTableCell>
              <StyledTableCell
                align="center"
                width="200px"
                rowSpan={2}
                colSpan={2}
              >
                HỌ VÀ TÊN
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={10}>
                HỌC KÌ{" "}
                {semester === "1"
                  ? "I"
                  : semester === "2"
                  ? "II"
                  : semester === "3"
                  ? "HÈ"
                  : label}
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
              <StyledTableCell align="center">TỔNG HỌC KÌ I</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell align="center">{row.mAGV}</StyledTableCell>
                <StyledTableCell style={{ borderRight: "none" }}>
                  {row.firtName}
                </StyledTableCell>
                <StyledTableCell style={{ borderLeft: "none" }}>
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
                <StyledTableCell align="center">{row.total}</StyledTableCell>
              </TableRow>
            ))}
            <TableRow>
              <StyledTableCell align="center" colSpan={4}>Tổng: </StyledTableCell>
              <StyledTableCell align="center">
                {total.TeachingVolume.toFixed(2) || 0}
              </StyledTableCell>
              <StyledTableCell align="center">
                {total.ProjectVolume.toFixed(2) || 0}
              </StyledTableCell>
              <StyledTableCell align="center">
                {total.GradingVolume.toFixed(2) || 0}
              </StyledTableCell>
              <StyledTableCell align="center">
                {total.ExamMonitorVolume.toFixed(2) || 0}
              </StyledTableCell>
              <StyledTableCell align="center">
                {total.ExamVolume.toFixed(2) || 0}
              </StyledTableCell>
              <StyledTableCell align="center">
                {total.ActivitiesVolume.toFixed(2) || 0}
              </StyledTableCell>
              <StyledTableCell align="center">
                {total.AdvisorVolume.toFixed(2) || 0}
              </StyledTableCell>
              <StyledTableCell align="center">
                {total.TotalVolume.toFixed(2) || 0}
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
      <div
        id="printsig"
        className="w-[1123px] justify-around text-center hidden"
      >
        <div>
          <h2>TP. PHÒNG ĐÀO TẠO ĐẠI HỌC & SAU ĐẠI HỌC</h2>
        </div>
        <div>
          <h2>HIỆU TRƯỞNG/ VIỆN TRƯỞNG</h2>
          <p>(kí và ghi rõ họ tên)</p>
        </div>
        <div>
          <p>Đà Nẵng,Ngày..... Tháng..... Năm 20... </p>
          <h2>TRƯỞNG KHOA</h2>
          <p>(kí và ghi rõ họ tên)</p>
        </div>
      </div>
    </div>
  );
}

export default ViewSemester;
