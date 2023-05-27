import React, { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useAddBannerMutation } from "../../redux/bannerAPISlice";
import AppSnackbar from "../../components/AppSnackbar";

const AddBanner = () => {
  const MAX_FILE_SIZE = 1000000; // 1MB in bytes
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [fileSize, setFileSize] = useState(0);

  const [
    addBannerMutation,
    { data: bannerResponse, isError, error: bannerError, isSuccess, isLoading },
  ] = useAddBannerMutation();

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
    formData.append("file", file);

    addBannerMutation(formData)
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
        Upload Banner
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
          {isLoading ? "Adding..." : "Add Banner"}
        </Button>
      </FormControl>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={bannerResponse ? bannerResponse.message : "Success"}
      />
    </>
  );
};

export default AddBanner;
