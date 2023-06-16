import React from "react";
import { Box, Typography } from "@mui/material";

const ErrorDisplay = ({ message }) => {
  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" color="error">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorDisplay;
