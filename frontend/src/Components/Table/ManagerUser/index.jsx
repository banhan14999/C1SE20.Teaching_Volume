import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

import StyledTableCell from "../../StyledTableCell";
import AddUser from "../../Form/AddUser";
import { ApiTeachingVolume } from "../../../apis/axios";
import { DataUpdate } from "../../../Redux/Actions/index";
import FloatBox from "../../FloatBox";

function ManagerUser() {
  const [user, setUser] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState();

  const param = useParams();
  const navigate = useNavigate();
  const dispath = useDispatch();

  function createData(Id, IdLecturer, FullName, School, Department, Role) {
    return { Id, IdLecturer, FullName, School, Department, Role };
  }
  function clickDelete(e) {
    // confirm trước khi xóa
    const user_id = e.target.dataset.delete;
    setConfirm(true);
    setIdDelete(user_id);
  }

  function handleClickConfirm(idDelete) {
    // xóa dữ liệu
    ApiTeachingVolume.Delete("/user/delete/", idDelete);
    const arr = user.filter((value) => {
      return value.Id !== Number(idDelete);
    });
    setUser(arr);
  }
  function handleUpdate(e) {
    // update và truyền dữ liệu qua component add
    const user_id = e.target.dataset.update;
    let arr = user.filter((value) => value.Id === Number(user_id));
    // đẩy dữ liệu bằng redux
    dispath(DataUpdate(arr));
    navigate(user_id);
  }
  useEffect(() => {
    // get all users
    ApiTeachingVolume.Get("user/all").then((res) => {
      const arr = res.users
        .map((value) => {
          if (value.IdRole !== 1) {
            return createData(
              value.id,
              value.IdLecturer,
              value.FirstName + " " + value.LastName,
              value.IdFaculty,
              value.IdDepartment,
              value.IdRole
            );
          } else {
            return false;
          }
        })
        .filter((value) => {
          return value;
        });
      setUser([...arr]);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - user.length) : 0;

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
        <AddUser hide="hidden" btn="Update" title="Update User"></AddUser>
      ) : (
        <div className="container">
          <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
            Manage Users
          </div>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow style={{}}>
                  <StyledTableCell align="center">DTU-ID</StyledTableCell>
                  <StyledTableCell align="center">Full Name</StyledTableCell>
                  <StyledTableCell align="center">Faculty</StyledTableCell>
                  <StyledTableCell align="center">Department</StyledTableCell>
                  <StyledTableCell align="center">Role</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                      ? user.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : user
                    ).map((row) => (
                  <TableRow
                    key={row.Id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.IdLecturer}
                    </StyledTableCell>
                    <StyledTableCell>{row.FullName}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.School}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Department}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.Role}</StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="flex justify-around items-center">
                        <div
                          className="flex justify-center items-center cursor-pointer "
                          onClick={handleUpdate}
                          data-update={row.Id}
                        >
                          <BiEdit
                            color="#0a7a0a"
                            className="pointer-events-none"
                            fontSize={14}
                          ></BiEdit>
                          Update
                        </div>
                        <div
                          className="cursor-pointer flex items-center justify-center"
                          onClick={clickDelete}
                          data-delete={row.Id}
                        >
                          <AiFillCloseCircle
                            color="#eb4f04"
                            className="pointer-events-none"
                            fontSize={16}
                          ></AiFillCloseCircle>
                          Delete
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
                    count={user.length}
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

export default ManagerUser;
