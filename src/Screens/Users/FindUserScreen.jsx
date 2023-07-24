import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useLazyFindUserByPhoneNoQuery } from "../../redux/userAPISlice";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useNavigate } from "react-router-dom";
import RouteConfig from "../../config/RouteConfig";

const FindUserScreen = () => {
  const navigate = useNavigate();

  const [phoneNo, setPhoneNo] = useState("");

  const [searchUser, { data, error, isLoading, isError }] =
    useLazyFindUserByPhoneNoQuery();

  const handleSearch = () => {
    if (!phoneNo.trim()) {
      return;
    }
    searchUser(phoneNo);
  };

  const handleEditUser = () => {
    navigate(`/${RouteConfig.EDIT_USER_SCREEN}`, { state: { user: data } });
  };

  const handleUserPayment = () => {
    navigate(`/${RouteConfig.PAYMENT_BY_USER_ID}`, {
      state: { userId: data.id },
    });
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
    <div>
      <Typography variant="h5" mt={2}>
        Find User
      </Typography>
      <TextField
        sx={{ mt: 2 }}
        label="Phone number"
        fullWidth
        margin="normal"
        value={phoneNo}
        type="number"
        onChange={(e) => setPhoneNo(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>

      {data ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">User Details:</Typography>
          <Typography>ID: {data.id}</Typography>
          <Typography>Name: {data.name}</Typography>
          <Typography>Phone No: {data.phoneNo || "N/A"}</Typography>
          <Typography>Payment Expire Date: {data.paymentExpireDate}</Typography>
          <Typography>Game Scored: {data.gameScored}</Typography>
          <Typography>Coin: {data.coin}</Typography>
          <Typography>Role: {data.role}</Typography>

          <Button
            sx={{ mt: 2, width: 200 }}
            onClick={handleEditUser}
            startIcon={<EditSharpIcon />}
            variant="contained"
          >
            Edit User
          </Button>
          <Button
            sx={{ mt: 2, display: "flex", width: 200 }}
            onClick={handleUserPayment}
            startIcon={<EditSharpIcon />}
            variant="contained"
          >
            Users Payments
          </Button>
        </Box>
      ) : (
        <Typography sx={{ mt: 2 }}>No user found</Typography>
      )}
    </div>
  );
};

export default FindUserScreen;
