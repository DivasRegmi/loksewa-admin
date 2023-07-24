import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  IconButton,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { format } from "date-fns";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddExamMutation } from "../../redux/ExamAPISlice";
import CategoryDropDown from "../../components/CategoryDropDown";

const AddExam = ({ sectionId }) => {
  const [title, setTitle] = useState("");
  const [examDate, setExamDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  const [addExamMutation, { isError, error: examError, isSuccess, isLoading }] =
    useAddExamMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
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
    if (!selectedCategory.toString().trim()) {
      setError("Category is required");
      return;
    }

    const body = {
      title,
      examDate: `${examDate}T00:00:00`,
    };

    addExamMutation({ categoryId: selectedCategory, body });
  };
  const handleToday = () => {
    const todayDate = new Date();
    const formattedDate = format(todayDate, "yyyy-MM-dd");
    setExamDate(formattedDate);
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = format(tomorrow, "yyyy-MM-dd");
    setExamDate(formattedDate);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Add Exam
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

        <CategoryDropDown
          handleChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          disable={false}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1 }}>
          <IconButton onClick={handleToday} sx={{ mr: 1 }}>
            <Typography variant="srOnly">Today</Typography>
            <DateRangeIcon />
          </IconButton>
          <IconButton onClick={handleTomorrow}>
            <Typography variant="srOnly">Tomorrow</Typography>
            <DateRangeIcon />
          </IconButton>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 1 }}
          startIcon={<AddIcon />}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Add Exam"}
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

export default AddExam;
