import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddExamModelSetSectionMutation } from "../../redux/ExamModelSetAPISlice";

const AddExamModelSetSection = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const [
    addExamModelSetSectionMutation,
    { isError, error: examModelSetSectionError, isSuccess, isLoading },
  ] = useAddExamModelSetSectionMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (examModelSetSectionError && examModelSetSectionError.data) {
        setError(examModelSetSectionError.data.message);
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
    const body = {
      title,
    };

    addExamModelSetSectionMutation(body);
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Add Exam Model Set Section
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
          {isLoading ? "Creating..." : "Add Exam Model Set Section"}
        </Button>
      </FormControl>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Exam Model Set Section Created"}
      />
    </>
  );
};

export default AddExamModelSetSection;
