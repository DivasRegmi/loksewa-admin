import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Add as AddIcon } from "@mui/icons-material";

import { useUpdateVacancyMutation } from "../../redux/vacancyAPISlice";

const EditVacancy = ({ vacancy, toggleEditVacancy }) => {
  const [title, setTitle] = useState(vacancy.title);
  const [error, setError] = useState(null);

  const [
    updateVacancyMutation,
    { isError, error: vacancyError, isSuccess, isLoading },
  ] = useUpdateVacancyMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setError(null);
      toggleEditVacancy({ id: -1 });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (vacancyError && vacancyError.data) {
        setError(vacancyError.data.message);
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

    updateVacancyMutation({
      vacancyId: vacancy.id,
      body: { title },
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    toggleEditVacancy({ id: -1 });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          disabled={isLoading}
          startIcon={<AddIcon />}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </FormControl>
    </>
  );
};

export default EditVacancy;
