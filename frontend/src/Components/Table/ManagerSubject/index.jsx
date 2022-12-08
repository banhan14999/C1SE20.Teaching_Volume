import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdAutoDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
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

import FloatBox from "../../FloatBox"
import StyledTableCell from "../../StyledTableCell";
import AddSubject from "../../Form/AddSubject";
import { DataUpdate } from "../../../Redux/Actions/index";
import { ApiTeachingVolume } from "../../../apis/axios";

function ManagerSubject() {
  const param = useParams()
  const navigate = useNavigate()
  const dispath = useDispatch();
  const [sub, setSub] = useState([]);

 const [confirm, setConfirm] = useState(false);
 const [idDelete, setIdDelete] = useState();

  function click(e) {
    // confirm trước khi xóa
    const Subject_id = e.target.attributes[1].nodeValue 
   setConfirm(true);
   setIdDelete(Subject_id);
  }
  function handleClickConfirm(Subject_id) {
    // xóa
    ApiTeachingVolume.Delete("/subject/delete/", Subject_id);
    const arr = sub.filter((value) => {
      return value.Subject_id !== parseInt(Subject_id);
    });
    setSub(arr);
  }
  function createData(Code, Subject, Credit, Type, Subject_id) {
    return { Code, Subject, Credit, Type, Subject_id };
  }

  const handleUpdate = (e) => {
    // đẩy dữ liệu qua component add subject
    const Subject_id = e.target.parentElement.attributes[1].nodeValue;
    let arr = sub.filter((value) => value.Subject_id === parseInt(Subject_id));
    arr[0]["Subject_id"] = Subject_id;
    dispath(DataUpdate(arr));
    navigate(Subject_id)
  };

  useEffect(() => {
    // get all subject
    const subjectData = ApiTeachingVolume.Get("/subject/all");
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
  }, [param.id]);
  


  
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sub.length) : 0;

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
        <AddSubject btn="Update" title="Updata Subject"></AddSubject>
      ) : (
        <div className={`container`}>
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manage Subject
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
                {(rowsPerPage > 0
                  ? sub.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : sub
                ).map((row) => (
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
                          <BiEdit
                            color="#0a7a0a"
                            className="mr-[2px]"
                            fontSize={12}
                          ></BiEdit>
                          <span>Update</span>
                        </div>
                        <div
                          className="flex justify-center items-center cursor-pointer ml-1"
                          onClick={click}
                          data-subid={row.Subject_id}
                        >
                          <MdAutoDelete
                            color="#eb4f04"
                            className="mr-[2px] pointer-events-none"
                            fontSize={12}
                          ></MdAutoDelete>
                          <span className="pointer-events-none">Delete</span>
                        </div>
                      </div>
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
                    count={sub.length}
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

export default ManagerSubject;
