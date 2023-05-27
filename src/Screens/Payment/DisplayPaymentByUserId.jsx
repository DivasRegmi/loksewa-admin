import React, { useState } from "react";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import { Box, Divider, Typography } from "@mui/material";
import MyPagination from "../../components/MyPagination";

import { useGetPaymentDetailsByUserIdQuery } from "../../redux/PaymentDetailsAPISlice";
import PaymentDetail from "./PaymentDetail";
import { useLocation } from "react-router-dom";


const DisplayPaymentByUserId = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(0);
  const [pageNo, setPageNo] = useState(0);

  const {
    data: payments,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetPaymentDetailsByUserIdQuery({
    userId: userId,
    pageNo: pageNo,
    pageSize: 20,
  });

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

export default DisplayPaymentByUserId;
