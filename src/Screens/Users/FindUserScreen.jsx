import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useLazyFindUserByEmailQuery } from "../../redux/userAPISlice";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useNavigate } from "react-router-dom";
import RouteConfig from "../../config/RouteConfig";

const FindUserScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [searchUser, { data, error, isLoading , isError}] =
    useLazyFindUserByEmailQuery();

  const handleSearch = () => {
    if (!email.trim()) {
      return;
    }
    searchUser(email);
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
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
