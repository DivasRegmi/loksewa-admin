import React, { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddQuestionImageMutation } from "../../redux/QuestionsAPISlice";

const AddQuestionImage = ({ questionId, onSuccuss }) => {
  const MAX_FILE_SIZE = 1000000; // 1MB in bytes
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [fileSize, setFileSize] = useState(0);

  const [
    addQuestionImageMutation,
    { isError, error: questionImageError, isSuccess, isLoading },
  ] = useAddQuestionImageMutation();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const size = file.size;
    setFile(file);
    setFileSize(size);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }
    if (fileSize > MAX_FILE_SIZE) {
      setError("File size exceeds the limit of 1MB.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    addQuestionImageMutation({
      questionId: questionId,
      formData: formData,
    });
  };

  useEffect(() => {
    if (isError) {
      if (questionImageError && questionImageError.data) {
        setError(questionImageError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && typeof onSuccuss === "function") {
      onSuccuss();
    }
  }, [isSuccess]);

  return (
    <>
      <Typography variant="h5" mt={2}>
        Upload Image
      </Typography>

      <FormControl
        fullWidth
        margin="normal"
        variant="outlined"
        error={Boolean(error)}
      >
        <OutlinedInput
          id="file-input"
          type="file"
          onChange={handleFileChange}
          endAdornment={
            <Button
              onClick={() => document.getElementById("file-input").click()}
              variant="contained"
            >
              Browse
            </Button>
          }
        />
        <FormHelperText>{error}</FormHelperText>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 1 }}
          disabled={isLoading}
          startIcon={<AddIcon />}
        >
          {isLoading ? "Adding..." : "Add Image"}
        </Button>
      </FormControl>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Image uploaded"}
      />
    </>
  );
};

export default AddQuestionImage;
