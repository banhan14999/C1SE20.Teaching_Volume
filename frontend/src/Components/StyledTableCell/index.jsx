import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import React, { Component }  from 'react';

 const StyledTableCell = styled(TableCell)((props) => 
  {
   return {
     [`&.${tableCellClasses.head}`]: {
       fontSize: 14,
       fontWeight: "bold",
       border: (props.hiden && "none") || "0.6px solid black !important",
     },
     [`&.${tableCellClasses.body}`]: {
       fontSize: 14,
       border: "0.4px solid black !important",
     },
    
   };});
export default StyledTableCell;