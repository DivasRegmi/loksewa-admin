import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";
import { useUpdateQuestionMutation } from "../../redux/QuestionsAPISlice";

const EditQuestion = ({ questionItem, toggleEditQuestion, onSuccuss }) => {
  const [question, setQuestion] = useState(questionItem.question);
  const [error, setError] = useState(null);

  const [
    updateQuestionMutation,
    { isError, error: questionError, isSuccess, isLoading },
  ] = useUpdateQuestionMutation();

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      setError(null);
      toggleEditQuestion({ id: -1 });
      if (typeof onSuccuss === "function") {
        onSuccuss();
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (questionError && questionError.data) {
        setError(questionError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      setError("Question is required");
      return;
    }

    const body = {
      question: question,
    };

    updateQuestionMutation({
      questionId: questionItem.id,
      body: body,
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="question"
        name="question"
        label="Question"
        fullWidth
        multiline
        margin="normal"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
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
        {isLoading ? "Updating..." : " Update Question"}
      </Button>
    </Box>
  );
};

export default EditQuestion;
