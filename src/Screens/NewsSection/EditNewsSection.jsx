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

import { useUpdateNewsSectionMutation } from "../../redux/newsAPISlice";

const EditNewsSection = ({ newsSection, toggleEditNewsSection }) => {
  const [title, setTitle] = useState(newsSection.title);
  const [error, setError] = useState(null);

  const [
    updateNewsSectionMutation,
    { isError, error: newsSectionError, isSuccess, isLoading },
  ] = useUpdateNewsSectionMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setError(null);
      toggleEditNewsSection({ id: -1 });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (newsSectionError && newsSectionError.data) {
        setError(newsSectionError.data.message);
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

    updateNewsSectionMutation({ newsSectionId: newsSection.id, title: title });
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
                    toggleEditNewsSection({ id: -1 });
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
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </FormControl>
    </>
  );
};

export default EditNewsSection;
