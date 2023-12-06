import React from "react";
import DisplayReferCount from "../Payment/DisplayReferCount";
import DisplayDailyDownloadUsers from "./DisplayDailyDownloadUsers";
import PaymentAnalytics from "./PaymentAnalytics";
import { Box, Paper } from "@mui/material";

const Home = () => {
  return (
    <div>
      <PaymentAnalytics />
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <DisplayDailyDownloadUsers />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <DisplayReferCount />
      </Paper>
    </div>
  );
};

export default Home;
