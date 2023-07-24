import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import RouteConfig from "../../config/RouteConfig";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/authAPISlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const [
    registerMutation,
    { isError, error: authError, isSuccess, isLoading },
  ] = useRegisterMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!phoneNo.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be atleast 6 character.");
      return;
    }
    const body = { phoneNo, password, name };
    registerMutation(body);
  };

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setPhoneNo("");
      setPassword("");
      setError("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (authError && authError.data) {
        setError(authError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const onPressLogin = () => {
    navigate(`/${RouteConfig.LOGIN_SCREEN}`);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>

        {isSuccess && (
          <Typography
            variant="subtitle1"
            color="white"
            sx={{ mt: 2, backgroundColor: "#4CAF50", p: 2 }}
          >
            Registration successful! Please login.
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Phone number"
            variant="outlined"
            margin="normal"
            value={phoneNo}
            type="number"
            onChange={(e) => setPhoneNo(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
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
              onClick={onPressLogin}
              sx={{ mr: 1, textDecoration: "underline" }}
            >
              Login
            </Button>
          </Box>

          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {isLoading ? "Registering.." : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
