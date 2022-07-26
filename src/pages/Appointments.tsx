import { gql, useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { UITextField } from "../components/UIComponents/UITextField";
import UserCenterList from "../components/UIComponents/UserCenterList";
import { UserHeader } from "../components/UIComponents/UserHeader";
import { BookAppointmentModal } from "../modals/BookAppointmentModal";
import { filterByKey } from "../utils/utils";
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

  const [filteredCenters, setFilteredCenters] = useState<
    GetCentersForAdminResponseParams[]
  >([]);

  const [centers, setCenters] = useState<GetCentersForAdminResponseParams[]>(
    []
  );
  const getCenters = useQuery<GetCenterForUsersResponse>(GET_USER_CENTERS);

  const filterCenters = (center: GetCentersForAdminResponseParams) => {
    if (
      filterByKey(
        [
          String(center?.name),
          String(center?.location),
          String(moment(center?.createdAt).format("DD-MM-YYYY")),
        ],
        searchText
      )
    ) {
      return true;
    }
    return false;
  };

  const filterData = () => {
    const array: any[] = [];
    getCenters?.data?.get_centers_for_users?.map((center) => {
      if (searchText != null && searchText != "" && !filterCenters(center)) {
        return;
      }
      array.push(center);
    });
    setFilteredCenters(array);
  };

  useEffect(() => {
    if (getCenters?.data && getCenters?.data?.get_centers_for_users) {
      filterData();
    }
  }, [getCenters?.data, searchText]);

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
            {filteredCenters?.length === 0 && (
              <Typography>No Vaccination Centers Available</Typography>
            )}
            {filteredCenters &&
              filteredCenters?.map((center) => (
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
