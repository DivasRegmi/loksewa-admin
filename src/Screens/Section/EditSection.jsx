import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useUpdateSectionMutation } from "../../redux/sectionAPISlice ";

const types = ["GK", "IQ", "ENGLISH"];
const EditSection = ({ section, toggleEditSection }) => {
  const MAX_FILE_SIZE = 1000000; // 1MB in bytes

  const [formData, setFormData] = useState({
    title: section.title,
    image: null,
    type: section.type,
  });
  const [formErrors, setFormErrors] = useState({});
  const [fileSizeError, setFileSizeError] = useState(false);

  const [updateSectionMutation, { isError, error, isSuccess, isLoading }] =
    useUpdateSectionMutation();

  useEffect(() => {
    if (isSuccess) {
      setFormData({ title: "", image: null, type: types[0] });
      setFileSizeError(false);
      setFormErrors({});
      toggleEditSection();
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
    const { title, image , type} = formData;
    if (!title.trim()) {
      errors.title = "Title is required";
    }

    if (!type.trim()) {
      errors.type = "Type is required";
    }

    if (image && image.size > MAX_FILE_SIZE) {
      errors.image = "File size should be less than 1MB";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formDataWithImage = new FormData();
    formDataWithImage.append("title", title);
    formDataWithImage.append("type", type);
    if (image) {
      formDataWithImage.append("image", image);
    }
    updateSectionMutation({ id: section.id, formData: formDataWithImage });
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

  const handleSectionTypeChange = (event) => {
    setFormData({ ...formData, type: event.target.value });
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Edit Section: {section.title}
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
         <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
          <InputLabel id="section-type-select-label">
            Select type 
          </InputLabel>
          <Select
            label="Select type"
            labelId="section-type-select-label"
            id="section-type-select"
            value={section.type}
            onChange={handleSectionTypeChange}
          >
            {types.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
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
          disabled={isLoading}
          startIcon={<AddIcon />}
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </FormControl>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Section Created"}
      />
    </>
  );
};

export default EditSection;
