import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";

import PaymentImage from "../../components/PaymentImage";
import { useUpdateUserMutation } from "../../redux/userAPISlice";
import {
  useDeletePaymentDetailMutation,
  useUpdatePaymentDetailsMutation,
} from "../../redux/PaymentDetailsAPISlice";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import AppSnackbar from "../../components/AppSnackbar";

const PaymentDetail = ({ payment, refetchPaymentDetails }) => {
  const {
    id,
    userId,
    image,
    amount,
    remark,
    referBy,
    status,
    userName,
    userPhoneNo,
    userPaymentExpireDate,
  } = payment;

  const [expiryDate, setExpiryDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [error, setError] = useState(null);
  const [confirmationOpenForStatus, setConfirmationOpenForStatus] =
    useState(false);

  const [confirmationOpenForDelete, setConfirmationOpenForDelete] =
    useState(false);

  const [
    updateUserMutation,
    { isError, error: userError, isSuccess, isLoading },
  ] = useUpdateUserMutation();

  const [
    updatePaymentMutation,
    {
      isError: isErrorUpdatePayment,
      error: paymentUpdateError,
      isSuccess: isSuccessUpdatePayment,
      isLoading: isLoadingUpdatePayment,
    },
  ] = useUpdatePaymentDetailsMutation();

  const [
    deletePaymentMutation,
    { isError: isErrorOnDelete, error: errorOnDelete },
  ] = useDeletePaymentDetailMutation();

  useEffect(() => {
    if (isSuccess) {
      setError("");
      refetchPaymentDetails();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdatePayment) {
      setError("");
      refetchPaymentDetails();
    }
  }, [isSuccessUpdatePayment]);

  useEffect(() => {
    if (isError) {
      if (userError && userError.data) {
        setError(userError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isErrorUpdatePayment) {
      if (paymentUpdateError && paymentUpdateError.data) {
        setError(paymentUpdateError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isErrorUpdatePayment, paymentUpdateError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      paymentExpireDate: expiryDate,
    };


    updateUserMutation({ userId: userId, body });
  };

  const handleChangeStatus = (e) => {
    e.preventDefault();

    handleConfirmationOpenForStatus();
  };

  const handleConfirmationOpenForStatus = () => {
    setConfirmationOpenForStatus(true);
  };

  const handleConfirmationCloseForStatus = () => {
    setConfirmationOpenForStatus(false);
  };

  const handleConfirmForStatus = () => {
    updatePaymentMutation({
      paymentDetailsId: id,
      status: status === "SOLVED" ? "UNSOLVED" : "SOLVED",
    });
    handleConfirmationCloseForStatus();
  };

  const onPressDeleteBtn = () => {
    handleConfirmationOpenForDelete();
  };

  const handleConfirmationOpenForDelete = () => {
    setConfirmationOpenForDelete(true);
  };

  const handleConfirmationCloseForDelete = () => {
    setConfirmationOpenForDelete(false);
  };

  const handleConfirmForDelete = () => {
    deletePaymentMutation(id);
    handleConfirmationCloseForDelete();
  };

  return (
    <Card>
      <CardContent style={{ display: "flex" }}>
        <PaymentImage image={image} />
        <div style={{ marginLeft: "25px", marginTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" component="div">
              Payment ID: {id}
            </Typography>
            <IconButton
              sx={{ ml: 2 }}
              onClick={(event) => {
                event.stopPropagation();
                onPressDeleteBtn();
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </div>

          <Typography variant="body1">name: {userName}</Typography>
          <Typography variant="body1">PhoneNo: {userPhoneNo || "N/A"}</Typography>
          <Typography variant="body1">Amount: {amount}</Typography>
          <Typography variant="body1">Remark: {remark || "N/A"}</Typography>
          <Typography variant="body1">Refer By: {referBy || "N/A"}</Typography>
          <Typography variant="body1">Status: {status}</Typography>

          <Typography variant="body1">
            Expiry Date: {userPaymentExpireDate}
          </Typography>

          <Divider sx={{ mt: 2 }} />
          <Typography variant="h5" sx={{ my: 2 }}>
            Edit: Expirary Date
          </Typography>

          <Box>
            <TextField
              key={expiryDate}
              label="Expiry Date"
              type="date"
              margin="normal"
              value={expiryDate}
              onChange={(e) => {
                setExpiryDate(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          {error && (
            <Typography variant="subtitle2" color="error">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 1 }}
            startIcon={<AddIcon />}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Expiry Date"}
          </Button>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleChangeStatus}
              sx={{ mt: 2 }}
              startIcon={<AddIcon />}
              disabled={isLoadingUpdatePayment}
            >
              {isLoadingUpdatePayment
                ? "Updating..."
                : status === "UNSOLVED"
                ? "Change To Solved"
                : "Change To Unsolve"}
            </Button>
          </div>

          <ConfirmationDialog
            title={"Confirm Status change"}
            description={"Are you sure you want to change status?"}
            open={confirmationOpenForStatus}
            handleClose={handleConfirmationCloseForStatus}
            handleConfirm={handleConfirmForStatus}
          />
          <ConfirmationDialog
            title={"Confirm Solved"}
            description={"Are you sure you want to delete this payment?"}
            open={confirmationOpenForDelete}
            handleClose={handleConfirmationCloseForDelete}
            handleConfirm={handleConfirmForDelete}
          />
          <AppSnackbar
            isOpen={isErrorOnDelete}
            autoHideDuration={4000}
            severity={"error"}
            message={
              errorOnDelete ? errorOnDelete.data.message : "Error on delete"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentDetail;
