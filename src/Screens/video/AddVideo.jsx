import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddVideoMutation } from "../../redux/videoAPISlice";

const AddVideo = ({ sectionId }) => {
  const [playlistId, setPlaylistId] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [addSectionMutation, { isError, error, isSuccess, isLoading }] =
    useAddVideoMutation();

  useEffect(() => {
    if (isSuccess) {
      setPlaylistId("");
      setFormErrors({});
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error && error.data) {
        setFormErrors({ _error: error.data.message });
      } else {
        setFormErrors({
          _error: "Something went wrong. Please try again later.",
        });
      }
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!playlistId.trim()) {
      errors.playlistId = "playlistId is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    addSectionMutation({ sectionId, body: { playlistId } });
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Add Video
      </Typography>

      <FormControl fullWidth margin="normal" variant="outlined">
        <TextField
          sx={{ marginTop: 0 }}
          id="playlistId"
          name="playlistId"
          label="playlistId"
          fullWidth
          margin="normal"
          value={playlistId}
          error={Boolean(formErrors.playlistId)}
          helperText={formErrors.playlistId}
          onChange={(e) => setPlaylistId(e.target.value)}
        />

        {formErrors._error && (
          <Typography variant="subtitle2" color="error">
            {formErrors._error}
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
          {isLoading ? "Creating..." : "Add Video"}
        </Button>
      </FormControl>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Section Created"}
      />
    </>
  );
};

export default AddVideo;
