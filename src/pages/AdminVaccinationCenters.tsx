import { gql, useMutation, useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminCenterList from "../components/UIComponents/AdminCenterList";
import { AdminHeader } from "../components/UIComponents/AdminHeader";
import { UIModel } from "../components/UIComponents/UIModal";
import { UIPrimaryButton } from "../components/UIComponents/UIPrimaryButton";
import { AddVaccinationCenterModal } from "../modals/AddVaccinationCenterModal";

export const GET_CENTERS = gql`
  query get_centers_for_admin {
    get_centers_for_admin {
      center_id
      name
      location
      createdAt
    }
  }
`;

export const DELETE_CENTER = gql`
  mutation delete_center($center_id: Float!) {
    delete_center(center_id: $center_id)
  }
`;

interface DeleteCenterInput {
  center_id: number;
}

interface DeleteCenterResponse {
  delete_center: string;
}
export interface GetCentersForAdminResponseParams {
  center_id: number;
  name: string;
  location: string;
  createdAt: Date;
}

export interface GetCentersForAdminResponse {
  get_centers_for_admin: GetCentersForAdminResponseParams[];
}

export function AdminVaccinationCenters() {
  const [addCenterModalOpen, setAddCenterModalOpen] = useState<boolean>(false);

  const [centers, setCenters] = useState<GetCentersForAdminResponseParams[]>(
    []
  );

  const [deleteCenter, deleteCenterResponse] = useMutation<
    DeleteCenterResponse,
    DeleteCenterInput
  >(DELETE_CENTER, {
    refetchQueries: [
      {
        query: GET_CENTERS,
      },
    ],
  });

  const getCenters = useQuery<GetCentersForAdminResponse>(GET_CENTERS);

  useEffect(() => {
    if (getCenters?.data && getCenters?.data?.get_centers_for_admin) {
      setCenters(getCenters?.data?.get_centers_for_admin);
    }
  }, [getCenters]);

  return (
    <>
      <AdminHeader>
        <div
          style={{
            width: "96%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Vaccination Centers</Typography>
            <UIPrimaryButton
              style={{
                height: "fit-content",
                justifySelf: "flex-end",
                marginLeft: "auto",
              }}
              onClick={() => {
                setAddCenterModalOpen(true);
              }}
            >
              Add Vaccination Center
            </UIPrimaryButton>
          </div>
          <div style={{ marginTop: 20 }}>
            {centers &&
              centers.map((center) => (
                <AdminCenterList
                  key={String(center.center_id)}
                  centerId={center.center_id}
                  location={center.location}
                  name={center.name}
                  createdAt={center.createdAt}
                  onDelete={(centerId: number) => {
                    deleteCenter({
                      variables: {
                        center_id: Number(centerId),
                      },
                    });
                  }}
                />
              ))}
          </div>
        </div>
      </AdminHeader>
      <AddVaccinationCenterModal
        closeModal={() => {
          setAddCenterModalOpen(false);
        }}
        modalOpen={addCenterModalOpen}
      />
    </>
  );
}
