import { gql, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { UIModel } from "../components/UIComponents/UIModal";
import { UIPrimaryButton } from "../components/UIComponents/UIPrimaryButton";
import { UITextField } from "../components/UIComponents/UITextField";
import {
  useErrorNotification,
  useSuccessNotification,
} from "../hooks/useNotification";
import { GET_CENTERS } from "../pages/AdminVaccinationCenters";

export interface AddVaccinationCenterProps {
  modalOpen: boolean;
  closeModal: () => void;
}

interface AddCenterInputParams {
  name: string;
  location: string;
}

interface AddCenterInput {
  input: AddCenterInputParams;
}

interface AddCenterResponse {
  create_center: string;
}

const CREATE_CENTER = gql`
  mutation create_center($input: VaccinationCenterInput!) {
    create_center(input: $input)
  }
`;

export function AddVaccinationCenterModal(props: AddVaccinationCenterProps) {
  const [name, setName] = React.useState<string>("");
  const [location, setLocation] = useState<string>("");

  const [createCenter, createCenterResponse] = useMutation<
    AddCenterResponse,
    AddCenterInput
  >(CREATE_CENTER, {
    refetchQueries: [
      {
        query: GET_CENTERS,
      },
    ],
  });

  useSuccessNotification([createCenterResponse?.data?.create_center as any]);

  useErrorNotification([createCenterResponse?.error as any]);

  useEffect(() => {
    if (
      createCenterResponse?.data &&
      createCenterResponse?.data?.create_center
    ) {
      props?.closeModal();
    }
  }, [createCenterResponse]);

  const confirmAdd = () => {
    createCenter({
      variables: {
        input: {
          name,
          location,
        },
      },
    });
  };

  return (
    <>
      <UIModel
        isOpen={props?.modalOpen}
        onClose={() => {
          props?.closeModal();
        }}
        title="Add Vaccination Center"
        hideCancel
        action={
          <UIPrimaryButton
            onClick={confirmAdd}
            loading={createCenterResponse?.loading}
          >
            Add Center
          </UIPrimaryButton>
        }
      >
        <UITextField
          margin="normal"
          required
          fullWidth
          id="center-name"
          label="Center Name"
          name="center-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          autoComplete="email"
          autoFocus
        />
        <UITextField
          margin="normal"
          required
          fullWidth
          id="location"
          label="Location"
          name="location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          autoComplete="email"
          autoFocus
        />
      </UIModel>
    </>
  );
}
