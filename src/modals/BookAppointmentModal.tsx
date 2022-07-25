import { gql, useMutation } from "@apollo/client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { UIModel } from "../components/UIComponents/UIModal";
import { UIPrimaryButton } from "../components/UIComponents/UIPrimaryButton";
import { UITextField } from "../components/UIComponents/UITextField";
import {
  useErrorNotification,
  useSuccessNotification,
} from "../hooks/useNotification";
import { GET_CENTERS } from "../pages/AdminVaccinationCenters";

export interface BookAppointmentProps {
  modalOpen: boolean;
  selectedCenter: number | undefined;
  closeModal: () => void;
}

interface BookAppointmentInputParams {
  vaccine_type: "COVAXIN" | "COVISHIELD";
  center_id?: number;
  appointment_time: Date;
}

interface BookAppointmentInput {
  input: BookAppointmentInputParams;
}

interface BookAppointmentResponse {
  create_appointment: string;
}

const BOOK_APPOINTMENT = gql`
  mutation create_appointment($input: AppointmentInput!) {
    create_appointment(input: $input)
  }
`;

export function BookAppointmentModal(props: BookAppointmentProps) {
  const [date, setDate] = useState<string>(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [vaccineType, setVaccineType] = useState<"COVAXIN" | "COVISHIELD">(
    "COVAXIN"
  );
  const [createAppointment, createAppointmentResponse] = useMutation<
    BookAppointmentResponse,
    BookAppointmentInput
  >(BOOK_APPOINTMENT);

  const confirmBook = () => {
    createAppointment({
      variables: {
        input: {
          center_id: Number(props.selectedCenter),
          appointment_time: new Date(date),
          vaccine_type: vaccineType,
        },
      },
    });
  };

  useSuccessNotification([
    createAppointmentResponse?.data?.create_appointment as any,
  ]);

  useErrorNotification([createAppointmentResponse?.error as any]);

  useEffect(() => {
    if (
      createAppointmentResponse?.data &&
      createAppointmentResponse?.data?.create_appointment
    ) {
      props?.closeModal();
    }
  }, [createAppointmentResponse]);

  return (
    <>
      <UIModel
        isOpen={props?.modalOpen}
        onClose={() => {
          props?.closeModal();
        }}
        title="Book Appointment"
        hideCancel
        action={
          <UIPrimaryButton
            onClick={confirmBook}
            loading={createAppointmentResponse?.loading}
          >
            Book
          </UIPrimaryButton>
        }
      >
        <UITextField
          margin="normal"
          required
          fullWidth
          id="date"
          label="Appointment Date"
          name="date"
          value={date}
          type="date"
          InputLabelProps={{ shrink: true, required: true }}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          style={{
            marginBottom: 20,
          }}
          autoComplete="email"
          autoFocus
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Vaccine Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vaccineType}
            label="Vaccine Type"
            onChange={(e: any) => {
              setVaccineType(e.target.value);
            }}
          >
            <MenuItem value={"COVAXIN"}>Covaxin</MenuItem>
            <MenuItem value={"COVISHIELD"}>Covishield</MenuItem>
          </Select>
        </FormControl>
      </UIModel>
    </>
  );
}
