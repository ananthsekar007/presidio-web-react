import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

interface TableProps {}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ActiveTable = (props: TableProps) => {
  return (
    <TableContainer
      component={Paper}
      style={{ width: "60%", margin: "10px auto" }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Vaccination Type</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {}
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>johndoe@gmail.com</TableCell>
            <TableCell>Covishield</TableCell>
            <TableCell>May 21, 2022</TableCell>
            <TableCell
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "10px",
              }}
            >
              <Button variant="outlined">Cancel Appointment</Button>
              <Button variant="contained">View Appointment</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>johndoe@gmail.com</TableCell>
            <TableCell>Covishield</TableCell>
            <TableCell>May 21, 2022</TableCell>
            <TableCell
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "10px",
              }}
            >
              <Button variant="outlined">Cancel Appointment</Button>
              <Button variant="contained">View Appointment</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>johndoe@gmail.com</TableCell>
            <TableCell>Covishield</TableCell>
            <TableCell>May 21, 2022</TableCell>
            <TableCell
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "10px",
              }}
            >
              <Button variant="outlined">Cancel Appointment</Button>
              <Button variant="contained">View Appointment</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>johndoe@gmail.com</TableCell>
            <TableCell>Covishield</TableCell>
            <TableCell>May 21, 2022</TableCell>
            <TableCell
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "10px",
              }}
            >
              <Button variant="outlined">Cancel Appointment</Button>
              <Button variant="contained">View Appointment</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActiveTable;
