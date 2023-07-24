import React, { useEffect, useState } from "react";

import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useAddImageMutation } from "../../redux/imageAPISlice";
import AppSnackbar from "../../components/AppSnackbar";

const AddImage = () => {
  const MAX_FILE_SIZE = 1000000; // 1MB in bytes
  const [file, setFile] = useState(null);
  const [tag, setTag] = useState(null);
  const [error, setError] = useState(null);
  const [fileSize, setFileSize] = useState(0);

  const [
    addImageMutation,
    { data: imageResponse, isError, error: bannerError, isSuccess, isLoading },
  ] = useAddImageMutation();

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
    if (!tag.trim()) {
      setError = "Tag is required";
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("tag", tag);

    addImageMutation(formData);
  };

  useEffect(() => {
    if (isError) {
      if (bannerError && bannerError.data) {
        setError(bannerError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  return (
    <>
      <Typography variant="h5" mt={2}>
        Add Images
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
          sx={{ mt: 2 }}
          label="Tag"
          fullWidth
          margin="normal"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
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
          {isLoading ? "Adding..." : "Add Images"}
        </Button>
      </FormControl>

      <Divider sx={{ mt: 2, mb: 2 }} />

      {imageResponse != null ? (
        <img
          src={imageResponse.image}
          alt={imageResponse.tag}
          style={{
            marginTop: "12px",
            width: "320px",
            height: "150px",
            objectFit: "contain",
          }}
        />
      ) : null}

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Success"}
      />
    </>
  );
};

export default AddImage;
