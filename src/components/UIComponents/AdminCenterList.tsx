import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreateIcon from "@mui/icons-material/Create";
import { UIPrimaryButton } from "./UIPrimaryButton";
import moment from "moment";

interface IAdminCenterListProps {
  name: string;
  location: string;
  createdAt: Date;
  centerId: number;
  onDelete: (center_id: number) => void;
  width?: string;
}

const AdminCenterList: React.FunctionComponent<IAdminCenterListProps> = (
  props
) => {
  return (
    <Paper
      elevation={1}
      style={{ width: props?.width || "60%", margin: "0px auto 10px" }}
      key={String(props?.centerId)}
    >
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              style={{
                height: "50px",
                outline: "1px solid blue",
                outlineOffset: "5px",
                width: "50px",
              }}
              src="https://randomuser.me/api/portraits/men/90.jpg"
            ></Avatar>
          </ListItemAvatar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "8px",
            }}
          >
            <Typography fontSize={19}>{props?.name}</Typography>
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  fontSize: 15,
                  color: "#666",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "4px",
                }}
              >
                <CreateIcon style={{ height: "20px" }} />
                <Typography>
                  {moment(props?.createdAt).format("DD-MM-YYYY")}
                </Typography>
              </div>
              <div style={{ borderLeft: "1px solid #9999" }} />
              <div
                style={{
                  fontSize: 15,
                  color: "#666",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocationOnIcon style={{ height: "20px" }} />
                <Typography>{props?.location}</Typography>
              </div>
            </div>
          </div>
          <UIPrimaryButton
            color={"error"}
            style={{ marginLeft: "auto" }}
            variant="contained"
            onClick={() => {
              props?.onDelete(props?.centerId);
            }}
          >
            Delete
          </UIPrimaryButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export default AdminCenterList;
