import { Link, Typography } from "@mui/material";
import React from "react";

export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        {`Website ${new Date().getFullYear()}`}
      </Link>
    </Typography>
  );
};
