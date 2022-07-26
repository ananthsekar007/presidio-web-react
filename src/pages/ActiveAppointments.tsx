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
import { gql, useMutation, useQuery } from "@apollo/client";
import { User } from "./Login";
import moment from "moment";
import {
  useErrorNotification,
  useSuccessNotification,
} from "../hooks/useNotification";

interface GetActiveAppointmentResponse {
  get_active_appointments: GetActiveAppointmentResponseParams[];
}

export interface GetActiveAppointmentResponseParams {
  appointment_id: number;
  center_id: number;
  user_id: number;
  vaccine_type: string;
  appointment_time: Date;
  UserModel: User;
  VaccinationCenterModel: VaccinationCenterModel;
}

interface VaccinationCenterModel {
  center_id: number;
  name: string;
  location: string;
}

interface CancelAppointmentInput {
  appointment_id: number;
}

interface CancelAppointmentResponse {
  cancel_appointment: string;
}

const GET_ACTIVE_APPOINTMENTS = gql`
  query get_active_appointments {
    get_active_appointments {
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

const CANCEL_APPOINTMENT = gql`
  mutation cancel_appointment($appointment_id: Float!) {
    cancel_appointment(appointment_id: $appointment_id)
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

export function ActiveAppointments() {
  const [appointments, setAppointments] =
    useState<GetActiveAppointmentResponseParams[]>();

  const getAppointments = useQuery<GetActiveAppointmentResponse>(
    GET_ACTIVE_APPOINTMENTS
  );

  const [cancelAppointment, cancelAppointmentResponse] = useMutation<
    CancelAppointmentResponse,
    CancelAppointmentInput
  >(CANCEL_APPOINTMENT, {
    refetchQueries: [
      {
        query: GET_ACTIVE_APPOINTMENTS,
        fetchPolicy: "no-cache",
      },
    ],
  });

  useEffect(() => {
    if (
      getAppointments?.data &&
      getAppointments?.data?.get_active_appointments
    ) {
      setAppointments(getAppointments?.data?.get_active_appointments);
    }
  }, [getAppointments]);

  useSuccessNotification([
    cancelAppointmentResponse?.data?.cancel_appointment as any,
  ]);

  useErrorNotification([cancelAppointmentResponse?.error as any]);

  return (
    <>
      <UserHeader>
        <div style={{ width: "96%", textAlign: "center" }}>
          <Typography variant={"h4"}>Active Appointments</Typography>
          {appointments && appointments?.length > 0 ? (
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
                    <StyledTableCell align="center">Actions</StyledTableCell>
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
                        <TableCell
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            gap: "10px",
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              cancelAppointment({
                                variables: {
                                  appointment_id: Number(
                                    appointment.appointment_id
                                  ),
                                },
                              });
                            }}
                          >
                            Cancel Appointment
                          </Button>
                          {/* <Button variant="contained">View Appointment</Button> */}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography mt={4} variant={"body1"}>
              No Active Appointments
            </Typography>
          )}
        </div>
      </UserHeader>
    </>
  );
}
