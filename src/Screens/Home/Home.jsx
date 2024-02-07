import React from "react";
import DisplayReferCount from "../Payment/DisplayReferCount";
import DisplayDailyDownloadUsers from "./DisplayDailyDownloadUsers";
import PaymentAnalytics from "./PaymentAnalytics";
import { Box, Paper } from "@mui/material";
import useAdminRestriction from "../../hooks/useAdminRestriction";
import Loading from "../../components/Loading";

const Home = () => {
  const isAdmin = useAdminRestriction();

  if (isAdmin === null) {
    return <Loading />;
  }

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
