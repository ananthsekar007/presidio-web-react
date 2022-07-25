import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserHeader } from "../components/UIComponents/UserHeader";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { gql, useQuery } from "@apollo/client";
import { User } from "./Login";
import moment from "moment";
import { GetActiveAppointmentResponseParams } from "./ActiveAppointments";

interface GetActiveAppointmentResponse {
  get_inactive_appointments: GetActiveAppointmentResponseParams[];
}

const GET_INACTIVE_APPOINTMENTS = gql`
  query get_inactive_appointments {
    get_inactive_appointments {
      appointment_id
      center_id
      user_id
      appointment_time
      vaccine_type
      UserModel {
        user_id
        name
        email
      }
      VaccinationCenterModel {
        center_id
        name
        location
      }
    }
  }
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export function InActiveAppointments() {
  const [appointments, setAppointments] =
    useState<GetActiveAppointmentResponseParams[]>();

  const getAppointments = useQuery<GetActiveAppointmentResponse>(
    GET_INACTIVE_APPOINTMENTS
  );

  useEffect(() => {
    if (
      getAppointments?.data &&
      getAppointments?.data?.get_inactive_appointments
    ) {
      setAppointments(getAppointments?.data?.get_inactive_appointments);
    }
  }, [getAppointments]);

  return (
    <>
      <UserHeader>
        <div style={{ width: "96%", textAlign: "center" }}>
          <Typography variant={"h4"}>Completed Appointments</Typography>
          <TableContainer
            component={Paper}
            style={{ width: "90%", margin: "20px auto" }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Center Name</StyledTableCell>
                  <StyledTableCell>Location</StyledTableCell>
                  <StyledTableCell>Vaccination Type</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments &&
                  appointments.map((appointment) => (
                    <TableRow>
                      <TableCell>
                        {appointment.VaccinationCenterModel.name}
                      </TableCell>
                      <TableCell>
                        {appointment.VaccinationCenterModel.location}
                      </TableCell>
                      <TableCell>{appointment.vaccine_type}</TableCell>
                      <TableCell>
                        {moment(appointment.appointment_time).format(
                          "MM-DD-YYYY"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </UserHeader>
    </>
  );
}
