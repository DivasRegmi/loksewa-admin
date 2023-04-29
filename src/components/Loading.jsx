import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading = ({ size = 40, thickness = 4, color = "primary" }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <CircularProgress size={size} thickness={thickness} color={color} />
    </Box>
  );
};

export default Loading;