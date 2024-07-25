import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
} from '@mui/material';
import { useDeleteAccountMutation } from '../../redux/userAPISlice';

const DeleteUserScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reason, setReason] = useState('');
  const [deleteAccount, { isLoading, isSuccess, isError, error }] = useDeleteAccountMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await deleteAccount({ phoneNumber, reasonForDeletion: reason }).unwrap();
      alert('Your request has been submitted.');
      // Clear the form
      setPhoneNumber('');
      setReason('');
    } catch (err) {
      console.error('Failed to submit account deletion request:', err);
      alert('Failed to submit account deletion request. Please try again later.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Request Account Deletion
        </Typography>
        <Typography component="p" variant="body1" sx={{ mt: 2, mb: 2 }}>
          To delete your account on Loksewa, the online exam app, please use the form below. If you encounter any problems, please email us at{' '}
          <a href="mailto:loksewatheonlineexam@gmail.com">loksewatheonlineexam@gmail.com</a>.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="tel"
            autoFocus
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="reason"
            label="Reason for Deletion"
            name="reason"
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Submit Request
          </Button>
        </Box>
        {isSuccess && <Typography variant="body2" color="success.main">Request submitted successfully.</Typography>}
        {isError && <Typography variant="body2" color="error.main">{error?.data?.message || 'An error occurred'}</Typography>}
      </Box>
    </Container>
  );
};

export default DeleteUserScreen;
