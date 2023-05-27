import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useUpdateUserMutation } from "../../redux/userAPISlice";
import { useLocation } from "react-router-dom";
import AppSnackbar from "../../components/AppSnackbar";


const ROLE = ["STUDENT", "ADMIN"];

const EditUser = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [name, setName] = useState(user.name);
  const [paymentExpireDate, setPaymentExpireDate] = useState(
    user.paymentExpireDate
  );
  const [gameScored, setGameScored] = useState(user.gameScored);
  const [coin, setCoin] = useState(user.coin);
  const [role, setRole] = useState(user.role);

  const [error, setError] = useState(null);

  const [
    updateUserMutation,
    { isError, error: userError, isSuccess, isLoading },
  ] = useUpdateUserMutation();

  const handelUpdate = () => {
    const body = { name, paymentExpireDate, gameScored, coin, role };
    updateUserMutation({ userId: user.id, body });
  };

  useEffect(() => {
    if (isSuccess) {
      setError("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (userError && userError.data) {
        setError(userError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, userError]);

  return (
    <Box sx={{ mb: "200px" }}>
      <TextField
        sx={{ mt: 2 }}
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        sx={{ mt: 2 }}
        label="Payment Expire Date"
        fullWidth
        type="date"
        margin="normal"
        value={paymentExpireDate}
        onChange={(e) => setPaymentExpireDate(e.target.value)}
      />
      <TextField
        sx={{ mt: 2 }}
        label="Coin"
        fullWidth
        type="number"
        margin="normal"
        value={coin}
        onChange={(e) => setCoin(e.target.value)}
      />
      <TextField
        sx={{ mt: 2 }}
        label="Game Score"
        fullWidth
        type="number"
        margin="normal"
        value={gameScored}
        onChange={(e) => setGameScored(e.target.value)}
      />

      <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
        <InputLabel id="role-select-label">Select Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          label="Select Role "
        >
          {ROLE.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && (
        <Typography variant="subtitle2" color="error" sx={{ mv: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        onClick={handelUpdate}
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Update user successed"}
      />
    </Box>
  );
};

export default EditUser;
