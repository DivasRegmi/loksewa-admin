import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useUpdateExamModelSetSectionMutation } from "../../redux/ExamModelSetAPISlice";

const EditExamModelSetSection = ({
  examModelSetSection,
  toggleEditExamModelSetSection,
}) => {
  const [title, setTitle] = useState(examModelSetSection.title);
  const [error, setError] = useState(null);

  const [
    updateExamModelSetSectionMutation,
    { isError, error: examModelSetSectionError, isSuccess, isLoading },
  ] = useUpdateExamModelSetSectionMutation();

  useEffect(() => {
    if (isSuccess) {
      toggleEditExamModelSetSection({ id: -1 });
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

    updateExamModelSetSectionMutation({
      examModelSetSectionId: examModelSetSection.id,
      body,
    });
  };

  return (
    <>
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
          {isLoading ? "Updating..." : "Update Exam Model Set Section"}
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

export default EditExamModelSetSection;
