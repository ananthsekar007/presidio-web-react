import { gql, useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UITextField } from "../components/UIComponents/UITextField";
import UserCenterList from "../components/UIComponents/UserCenterList";
import { UserHeader } from "../components/UIComponents/UserHeader";
import { BookAppointmentModal } from "../modals/BookAppointmentModal";
import { GetCentersForAdminResponseParams } from "./AdminVaccinationCenters";

const GET_USER_CENTERS = gql`
  query get_centers_for_users {
    get_centers_for_users {
      center_id
      name
      location
      createdAt
    }
  }
`;

interface GetCenterForUsersResponse {
  get_centers_for_users: GetCentersForAdminResponseParams[];
}

export const Appointments: React.FunctionComponent = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCenter, setSelectedCenter] = useState<number | null>();
  const [bookModalOpen, setBookModalOpen] = useState<boolean>(false);

  const [centers, setCenters] = useState<GetCentersForAdminResponseParams[]>(
    []
  );
  const getCenters = useQuery<GetCenterForUsersResponse>(GET_USER_CENTERS);

  useEffect(() => {
    if (getCenters?.data && getCenters?.data?.get_centers_for_users) {
      setCenters(getCenters?.data?.get_centers_for_users);
    }
  }, [getCenters]);

  useEffect(() => {
    console.log(selectedCenter);
  }, [selectedCenter]);

  return (
    <>
      <UserHeader>
        <div style={{ width: "96%", textAlign: "center" }}>
          <Typography variant={"h4"}>Vaccination Centers</Typography>
          <UITextField
            margin="normal"
            fullWidth
            id="search"
            label="Search Vaccination Centers..."
            name="search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            autoFocus
          />
          <div
            style={{
              marginTop: 20,
            }}
          >
            {centers &&
              centers.map((center) => (
                <UserCenterList
                  key={String(center.center_id)}
                  centerId={center.center_id}
                  location={center.location}
                  name={center.name}
                  createdAt={center.createdAt}
                  width={"80%"}
                  onAppointment={(centerId: number) => {
                    setSelectedCenter(centerId);
                    setBookModalOpen(true);
                  }}
                />
              ))}
          </div>
        </div>
      </UserHeader>
      <BookAppointmentModal
        closeModal={() => {
          setSelectedCenter(null);
          setBookModalOpen(false);
        }}
        modalOpen={bookModalOpen}
        selectedCenter={selectedCenter || undefined}
      />
    </>
  );
};

export default Appointments;
