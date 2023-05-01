import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddNewsSectionMutation } from "../../redux/newsAPISlice";

const AddNewsSection = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const [
    addNewsSectionMutation,
    { isError, error: newsSectionError, isSuccess, isLoading },
  ] = useAddNewsSectionMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (newsSectionError && newsSectionError.data) {
        setError(newsSectionError.data.message);
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

    addNewsSectionMutation(title);
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Add NewsSection
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
        message={"NewsSection Created"}
      />
    </>
  );
};

export default AddNewsSection;
