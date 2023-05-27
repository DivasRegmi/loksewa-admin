import React, { useState } from "react";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MyPagination from "../../components/MyPagination";

import {
  useGetPaymentDetailsByStatusQuery,
} from "../../redux/PaymentDetailsAPISlice";
import PaymentDetail from "./PaymentDetail";

const status = ["UNSOLVED", "SOLVED"];

const DisplayPayment = () => {
  const [selectedStatus, setSelectedStatus] = useState(status[0]);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(0);
  const [pageNo, setPageNo] = useState(0);

  const {
    data: payments,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetPaymentDetailsByStatusQuery({
    status: selectedStatus,
    pageNo: pageNo,
    pageSize: 20,
  });

  const handlePaymentStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const onPressPaymentItem = (index) => {
    setSelectedPaymentIndex(index);
  };

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
      <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
        <InputLabel id="payment-select-label">Select payment status</InputLabel>
        <Select
          labelId="payment-select-label"
          id="payment-select"
          value={selectedStatus}
          onChange={handlePaymentStatusChange}
          label="Select payment type"
        >
          {status.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ my: 2 }} />
      {payments.content.length > 0 && (
        <>
          <PaymentDetail
            payment={payments.content[selectedPaymentIndex]}
            refetchPaymentDetails={refetch}
          />
          <Divider sx={{ my: 2 }} />
        </>
      )}

      <Box
        sx={{
          display: "flex",
          width: "auto",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {payments.content.map((payment, index) => (
          <div
            key={`key-${index}`}
            onClick={() => onPressPaymentItem(index)}
            style={{
              padding: 8,
              margin: 5,
              borderWidth: 1,
              backgroundColor: "#f5f5f5",
              width: "25px",
              height: "25px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>{payment.id}</Typography>
          </div>
        ))}
      </Box>
      <Box sx={{ mb: 2 }}>
        <MyPagination
          pageNo={pageNo}
          totalPages={payments.paginationResponse.totalPages}
          onChangePage={(value) => setPageNo(value)}
        />
      </Box>
    </>
  );
};

export default DisplayPayment;
