import React, { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddQuestionSolutionDescriptionMutation } from "../../redux/QuestionSolutionDescriptionAPISlice";

const AddQuestionSolutionDescription = ({ questionId, onSuccuss }) => {
  const MAX_FILE_SIZE = 1000000; // 1MB in bytes
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [fileSize, setFileSize] = useState(0);

  const [
    addQuestionSolutionDescriptionMutation,
    { isError, error: questionSolutionError, isSuccess, isLoading },
  ] = useAddQuestionSolutionDescriptionMutation();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const size = file.size;
    setFile(file);
    setFileSize(size);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fileSize > MAX_FILE_SIZE) {
      setError("File size exceeds the limit of 1MB.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    addQuestionSolutionDescriptionMutation({
      questionId: questionId,
      formData: formData,
    });
  };

  useEffect(() => {
    if (isError) {
      if (questionSolutionError && questionSolutionError.data) {
        setError(questionSolutionError.data.message);
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
        Upload Question Solution Description
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

        <TextField
          variant="outlined"
          margin="normal"
          label="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          multiline
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
          {isLoading ? "Adding..." : "Add Solution"}
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

export default AddQuestionSolutionDescription;
