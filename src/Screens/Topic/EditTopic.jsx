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

import { useUpdateTopicMutation } from "../../redux/topicsAPISlice";

const EditTopic = ({ topic, toggleEditTopic }) => {
  const [title, setTitle] = useState(topic.title);
  const [error, setError] = useState(null);

  const [
    updateTopicMutation,
    { isError, error: topicError, isSuccess, isLoading },
  ] = useUpdateTopicMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setError(null);
      toggleEditTopic({ id: -1 });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (topicError && topicError.data) {
        setError(topicError.data.message);
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

    updateTopicMutation({ topicId: topic.id, title: title });
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
                    toggleEditTopic({ id: -1 });
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

export default EditTopic;
