import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTableCell from "../../StyledTableCell";
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
import { useState } from "react";
function MarkingVolume({ marking }) {
  console.log(marking);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 6) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
        3. Khối lượng chấm bài
      </div>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
          <TableHead style={{ backgroundColor: "#afafaf" }}>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Mã</StyledTableCell>
              <StyledTableCell align="center">Số hiệu</StyledTableCell>
              <StyledTableCell align="center">
                Tên học phần chấm bài
              </StyledTableCell>
              <StyledTableCell align="center">Khối lớp</StyledTableCell>
              <StyledTableCell align="center">Loại hình</StyledTableCell>
              <StyledTableCell align="center">Học kỳ</StyledTableCell>
              <StyledTableCell align="center">Lần thi</StyledTableCell>
              <StyledTableCell align="center">Đơn vị tính</StyledTableCell>
              <StyledTableCell align="center">Số lượng</StyledTableCell>
              <StyledTableCell align="center">Hệ số</StyledTableCell>
              <StyledTableCell align="center">HK I</StyledTableCell>
              <StyledTableCell align="center">HK II</StyledTableCell>
              <StyledTableCell align="center">HK HÈ 2020-2021</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? marking.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : marking
            ).map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <StyledTableCell align="center">{index}</StyledTableCell>
                <StyledTableCell width={200} align="center">
                  {row.Letter}
                </StyledTableCell>
                <StyledTableCell align="center">{row.Number}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.SubjectName}
                </StyledTableCell>
                <StyledTableCell align="center">{row.Grade}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.TypeClass}
                </StyledTableCell>
                <StyledTableCell align="center">{row.Semester}</StyledTableCell>
                <StyledTableCell align="center">1</StyledTableCell>
                <StyledTableCell align="center">Bài</StyledTableCell>
                <StyledTableCell align="center">{row.NumberGE}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.CoefficientGradeExam}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.Semester == 1
                    ? row.NumberGE * Number(row.CoefficientGradeExam)
                    : ""}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.Semester == 2
                    ? row.NumberGE * Number(row.CoefficientGradeExam)
                    : ""}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.NumberGE * Number(row.CoefficientGradeExam)}
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
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={6}
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
    </div>
  );
}

export default MarkingVolume;
