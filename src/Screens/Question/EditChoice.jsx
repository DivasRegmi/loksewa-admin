import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";
import { useUpdateChoiceMutation } from "../../redux/QuestionsAPISlice";

const EditChoice = ({ choiceItem, toggleEditChoice, onSuccuss }) => {
  const [choice, setChoice] = useState(choiceItem.choice);
  const [error, setError] = useState(null);

  const [
    updateChoiceMutation,
    { isError, error: choiceError, isSuccess, isLoading },
  ] = useUpdateChoiceMutation();

  useEffect(() => {
    if (isSuccess) {
      setChoice("");
      setError(null);
      toggleEditChoice({ id: -1 });

      if (typeof onSuccuss === "function") {
        onSuccuss();
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (choiceError && choiceError.data) {
        setError(choiceError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!choice.trim()) {
      setError("Choice is required");
      return;
    }

    const body = {
      choice: choice,
    };

    updateChoiceMutation({
      choiceId: choiceItem.id,
      body: body,
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="choice"
        name="choice"
        label="Choice"
        fullWidth
        multiline
        margin="normal"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
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
        startIcon={<AddIcon />}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : " Update Choice"}
      </Button>
    </Box>
  );
};

export default EditChoice;
