import React from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import { useGetPaymentReferCountQuery } from "../../redux/PaymentDetailsAPISlice";

const DisplayReferCount = () => {
  const { data, isLoading, error, isError } = useGetPaymentReferCountQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    let errMsg;
    if (error && error.data && error.data.message) {
      errMsg = error.data.message;
    } else {
      errMsg = "Something went wrong. Please try again later.";
    }

    return <ErrorDisplay message={errMsg} />;
  }
  return (
    <>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Payment Refer List
      </Typography>
      <TableContainer sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Refer By
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Count
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.referBy}</TableCell>
                <TableCell>{item.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DisplayReferCount;
