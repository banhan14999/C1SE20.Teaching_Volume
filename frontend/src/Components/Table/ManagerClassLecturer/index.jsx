import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Link} from "react-router-dom"
import { GrUpdate } from "react-icons/gr";
import React, { Component }  from 'react';

import StyledTableCell from "../../StyledTableCell"

function ManagerClassLecturer(props) {
    function createData(ClassName, Subject, Student, Action) {
      return { ClassName, Subject, Student, Action};
    }

    const rows = [
      createData("CMU-ENG 230 EIS", "AVCN cho SV CMU2", 40, "Update"),
      createData("CMU-ENG 230 EIS1", "AVCN cho SV CMU2", 40, "Update"),
      createData("CMU-ENG 230 EIS2", "AVCN cho SV CMU2", 40, "Update"),
      createData("CMU-ENG 230 EIS3", "AVCN cho SV CMU2", 40, "Update"),
    ];
  return (
    <div className="container">
      <div className="text-center text-[20px] font-[600] line mb-[20px] text-red-700">
        Manage Class Lecturer
      </div>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow style={{}}>
              <StyledTableCell align="center">Class Name</StyledTableCell>
              <StyledTableCell align="center">Subject</StyledTableCell>
              <StyledTableCell align="center">Student</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.ClassName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {row.ClassName}
                </StyledTableCell>
                <StyledTableCell align="center">{row.Subject}</StyledTableCell>
                <StyledTableCell align="center">{row.Student}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link
                    to="/"
                    className="flex items-center text-center justify-center"
                  >
                    <GrUpdate className="mr-2"></GrUpdate>
                    <p>{row.Action}</p>
                  </Link>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManagerClassLecturer;
