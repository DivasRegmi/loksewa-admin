import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddTopicMutation } from "../../redux/topicsAPISlice";

const AddTopic = ({ sectionId }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const [
    addTopicMutation,
    { isError, error: topicError, isSuccess, isLoading },
  ] = useAddTopicMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (topicError && topicError.data) {
        setError(topicError.data.message);
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

    addTopicMutation({ sectionId: sectionId, title: title });
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Add Topic
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
        >
          {isLoading ? "Creating..." : "Create"}
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

export default AddTopic;