import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";

const DisplayReportDescriptionAnduser = ({ data }) => {
  return (
    <>
      {data.map((report, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <CardContent>
            <Typography component="p">{report.reportDescription}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography color="textSecondary">
              User: {report.userName}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Phone No: {report.userPhoneNo}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default DisplayReportDescriptionAnduser;
