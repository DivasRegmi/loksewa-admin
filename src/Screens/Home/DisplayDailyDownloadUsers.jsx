import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Label,

} from "recharts";
import { Typography, Box } from "@mui/material";

import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import {
  useDailyDownloadUsersLast30DaysQuery,
  useDailyDownloadUsersLast6MonthsQuery,
} from "../../redux/userActivitiesAPISlice";

const DisplayDailyDownloadUsers = () => {
  const {
    data: dailyDownloadData,
    isLoading: dailyDownloadLoading,
    error: dailyDownloadError,
    isError: dailyDownloadIsError,
  } = useDailyDownloadUsersLast30DaysQuery();

  const {
    data: monthlyCounts,
    isLoading: monthlyCountsLoading,
    error: monthlyCountsError,
    isError: monthlyCountsIsError,
  } = useDailyDownloadUsersLast6MonthsQuery();

  if (dailyDownloadLoading || monthlyCountsLoading) {
    return <Loading />;
  }

  if (dailyDownloadIsError || monthlyCountsIsError) {
    let errMsg;
    if (
      dailyDownloadError &&
      dailyDownloadError.data &&
      dailyDownloadError.data.message
    ) {
      errMsg = dailyDownloadError.data.message;
    } else if (
      monthlyCountsError &&
      monthlyCountsError.data &&
      monthlyCountsError.data.message
    ) {
      errMsg = monthlyCountsError.data.message;
    } else {
      errMsg = "Something went wrong. Please try again later.";
    }

    return <ErrorDisplay message={errMsg} />;
  }

  const dailyChartData = Object.keys(dailyDownloadData).map((date) => ({
    date,
    count: dailyDownloadData[date],
  }));

  const monthlyChartData = Object.keys(monthlyCounts).map((month) => ({
    month,
    count: monthlyCounts[month],
  }));

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Daily Download Users in the Last 30 Days
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={dailyChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            interval={0}
            tickFormatter={(value) => new Date(value).getDate()} // Display only the day
          />
          <YAxis />
          <Tooltip />
          <Line type="linear" dataKey="count" stroke="#8884d8" dot={false}>
            {/* Display count on top of each data point */}
            <Label content={({ payload }) => payload.value} position="top" />
          </Line>
        </LineChart>
      </ResponsiveContainer>

      <Typography variant="h5" sx={{ mt: 2 }}>
        Monthly Download Users in the Last 6 Months
      </Typography>
      <Box display="flex" justifyContent="space-between" flexWrap={"wrap"}>
        {monthlyChartData.map((entry, index) => (
          <Box
            key={entry.month}
            sx={{
              width: "100px",
              textAlign: "center",
              padding: 1,
              margin:1,
              backgroundColor: "#f0f0f0" , // Alternating background colors
            }}
          >
            <Typography>{entry.month}</Typography>
            <Typography>{entry.count}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default DisplayDailyDownloadUsers;
