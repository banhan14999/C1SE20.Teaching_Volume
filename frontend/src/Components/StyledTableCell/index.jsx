import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
 const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
     fontSize: 16,
     fontWeight: "bold",
     border: "0.6px solid black !important",
   },
   [`&.${tableCellClasses.body}`]: {
     fontSize: 14,
     border: "0.4px solid black !important",
   },
 }));
export default StyledTableCell;