import { Alert, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AppSnackbar = ({ isOpen, severity, autoHideDuration, message }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ width: "90%" }}
      autoHideDuration={autoHideDuration}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Alert
        variant="filled"
        onClose={() => {
          setOpen(false);
        }}
        severity={severity}
        sx={{ width: "90%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

AppSnackbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
  autoHideDuration: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};

export default AppSnackbar;
