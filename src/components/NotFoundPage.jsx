import React from "react";
import { Box } from "@mui/material";

const NotFoundPage = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "2rem",
    }}
  >
    There's nothing here: 404!
  </Box>
);

export default NotFoundPage;