import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useAuthenticateMutation } from "../../redux/authAPISlice";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import RouteConfig from "../../config/RouteConfig";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [
    authenticateMutation,
    { data: user, isError, error: authError, isSuccess },
  ] = useAuthenticateMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!phoneNo.trim()) {
      setError("Phone Number is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }
    const body = { phoneNo, password };
    authenticateMutation(body);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(user));
      navigate(`/`);
      setPhoneNo("");
      setPassword("");
      setError("");
    }
  }, [isSuccess, user]);

  useEffect(() => {
    if (isError) {
      if (authError && authError.data) {
        setError(authError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPressRegister = () => {
    navigate(`/${RouteConfig.REGISTER_SCREEN}`);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Phone number"
            type="number"
            margin="normal"
            fullWidth
            value={phoneNo}
            onChange={handlePhoneNoChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {error && (
            <Typography variant="subtitle2" color="error" sx={{ mt: 1, ml: 2 }}>
              {error}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
            }}
          >
            <Button
              onClick={onPressRegister}
              sx={{ mr: 1, textDecoration: "underline" }}
            >
              Register
            </Button>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
