import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddCategoryMutation } from "../../redux/categoryAPISlice";

const AddCategory = () => {
  const MAX_FILE_SIZE = 1000000; // 1MB in bytes

  const [formData, setFormData] = useState({ title: "", image: null });
  const [formErrors, setFormErrors] = useState({});
  const [fileSizeError, setFileSizeError] = useState(false);

  const [addSectionMutation, { isError, error, isSuccess, isLoading }] =
    useAddCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      setFormData({ title: "", image: null });
      setFileSizeError(false);
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
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.image) {
      errors.image = "Please select a file";
    } else if (formData.image.size > MAX_FILE_SIZE) {
      errors.image = "File size should be less than 1MB";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formDataWithFile = new FormData();
    formDataWithFile.append("title", formData.title);
    formDataWithFile.append("image", formData.image);
    addSectionMutation(formDataWithFile);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(true);
        setFormData({ ...formData, image: null });
      } else {
        setFileSizeError(false);
        setFormData({ ...formData, image: file });
      }
    }
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Add Category
      </Typography>

      <FormControl fullWidth margin="normal" variant="outlined">
        <TextField
          sx={{ marginTop: 0 }}
          id="title"
          name="title"
          label="Title"
          fullWidth
          margin="normal"
          value={formData.title}
          error={Boolean(formErrors.title)}
          helperText={formErrors.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

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

        {formErrors._error && (
          <Typography variant="subtitle2" color="error">
            {formErrors._error}
          </Typography>
        )}
        {formErrors.image && (
          <Typography variant="subtitle2" color="error">
            {formErrors.image}
          </Typography>
        )}
        {fileSizeError && (
          <Typography variant="subtitle2" color="error">
            File too large, must be less than 1MB.
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
          {isLoading ? "Creating..." : "Add Category"}
        </Button>
      </FormControl>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Category Created"}
      />
    </>
  );
};

export default AddCategory;
