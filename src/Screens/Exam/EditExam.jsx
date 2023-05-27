import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useUpdateExamMutation } from "../../redux/ExamAPISlice";

const EditExam = ({ exam, toggleEditExam }) => {
  const [title, setTitle] = useState(exam.title);
  const [examDate, setExamDate] = useState(exam.examDate.slice(0, 10));
  const [error, setError] = useState(null);

  const [
    updateExamMutation,
    { isError, error: examError, isSuccess, isLoading },
  ] = useUpdateExamMutation();

  useEffect(() => {
    if (isSuccess) {
      toggleEditExam({ id: -1 });
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (examError && examError.data) {
        setError(examError.data.message);
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
      examDate: `${examDate}T00:00:00`,
    };

    updateExamMutation({ examId: exam.id, body });
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

        <TextField
          key={examDate}
          id="date"
          name="date"
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={examDate}
          onChange={(e) => {
            setExamDate(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 1 }}
          startIcon={<AddIcon />}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Exam"}
        </Button>
      </FormControl>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Exam Created"}
      />
    </>
  );
};

export default EditExam;
