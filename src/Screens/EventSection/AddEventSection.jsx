import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddEventSectionMutation } from "../../redux/eventAPISlice";

const AddEventSection = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const [
    addEventSectionMutation,
    { isError, error: eventSectionError, isSuccess, isLoading },
  ] = useAddEventSectionMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (eventSectionError && eventSectionError.data) {
        setError(eventSectionError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    addEventSectionMutation(title);
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Add EventSection
      </Typography>

      <FormControl fullWidth margin="normal" variant="outlined">
        <TextField
          sx={{ marginTop: 0 }}
          id="title"
          name="title"
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          error={Boolean(error)}
          onChange={(e) => setTitle(e.target.value)}
        />

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
          disabled={isLoading}
          startIcon={<AddIcon />}
        >
          {isLoading ? "Adding..." : "Add Event Section"}
        </Button>
      </FormControl>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"EventSection Created"}
      />
    </>
  );
};

export default AddEventSection;
