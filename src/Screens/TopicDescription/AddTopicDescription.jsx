import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddTopicDescriptionMutation } from "../../redux/topicDescriptionAPISlice";

const AddTopicDescription = ({ topicId }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const [
    addTopicDescriptionMutation,
    { isError, error: topicDescriptionError, isSuccess, isLoading },
  ] = useAddTopicDescriptionMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (topicDescriptionError && topicDescriptionError.data) {
        setError(topicDescriptionError.data.message);
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

    addTopicDescriptionMutation({ topicId: topicId, body: { title } });
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Add Topic Description
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
          startIcon={<AddIcon />}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Add Topic"}
        </Button>
      </FormControl>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Topic Created"}
      />
    </>
  );
};

export default AddTopicDescription;
