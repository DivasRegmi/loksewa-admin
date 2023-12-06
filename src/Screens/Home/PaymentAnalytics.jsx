import React from "react";

import { Typography, Box, CircularProgress, Paper } from "@mui/material";
import {
  useGetTotalAmountByLast6MonthsQuery,
  useGetTotalAmountTillNowQuery,
} from "../../redux/PaymentDetailsAPISlice";

const PaymentAnalytics = () => {
  // Fetching total amount till now
  const { data: totalAmountTillNow, isLoading: isLoadingTillNow } =
    useGetTotalAmountTillNowQuery();

  // Fetching total amount by last 6 months
  const { data: totalAmountByLast6Months, isLoading: isLoadingLast6Months } =
    useGetTotalAmountByLast6MonthsQuery();

  if (isLoadingTillNow || isLoadingLast6Months) {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        Payment Analytics
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h6" gutterBottom>
          Total Amount Till Now:
        </Typography>
        <Typography variant="h5" color="primary">
          Rs {totalAmountTillNow}
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Total Amount by Last 6 Months:
        </Typography>
        <ul>
          {totalAmountByLast6Months.map(([month, amount]) => (
            <li key={month}>
              <Typography>
                <strong>Month {month}:</strong> Rs {amount}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
};

export default PaymentAnalytics;
