import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useAddQuestionMutation } from "../../redux/QuestionsAPISlice";
import AppSnackbar from "../../components/AppSnackbar";
import AddQuestionImage from "./AddQuestionImage";


const AddQuestion = ({ topicId }) => {
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([
    { choice: "", rightChoice: false },
    { choice: "", rightChoice: false },
    { choice: "", rightChoice: false },
    { choice: "", rightChoice: false },
  ]);

  const [
    addQuestionMutation,
    {
      data: questionDataOnSuccess,
      isError,
      error: questionError,
      isSuccess,
      isLoading,
    },
  ] = useAddQuestionMutation();

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      setChoices([
        { choice: "", rightChoice: false },
        { choice: "", rightChoice: false },
        { choice: "", rightChoice: false },
        { choice: "", rightChoice: false },
      ]);
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (questionError && questionError.data) {
        console.log(questionError);
        setError(questionError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      question: question,
      choices: choices,
    };

    if (!question.trim()) {
      setError("Question is required");
      return;
    }

    let hasMissingChoice = false;
    choices.forEach((choice) => {
      if (!choice.choice.trim()) {
        setError("Choice is required");
        hasMissingChoice = true;
        return;
      }
    });

    if (choices.every((choice) => !choice.rightChoice)) {
      setError("Choose the correct answer");
      return;
    }

    if (hasMissingChoice) {
      return;
    }

    addQuestionMutation({
      topicId: topicId,
      body: body,
    });
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleChoiceChange = (event, index) => {
    const newChoices = [...choices];
    newChoices[index].choice = event.target.value;
    setChoices(newChoices);
  };

  const handleRightChoiceChange = (event, index) => {
    const newChoices = [...choices];
    newChoices.forEach((choice) => (choice.rightChoice = false));
    newChoices[index].rightChoice = true;
    setChoices(newChoices);
  };

  return (
    <>
      <Typography variant="h6">Enter Question</Typography>
      <TextField
        label="Question"
        variant="outlined"
        fullWidth
        margin="normal"
        value={question}
        onChange={handleQuestionChange}
        multiline
      />
      {error && (
        <Typography variant="subtitle2" color="error">
          {error}
        </Typography>
      )}
      <Typography variant="h6">Enter Choices</Typography>
      {choices.map((choice, index) => (
        <Box
          key={`key-${index}`}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            label={`Choice ${index + 1}`}
            value={choice.choice}
            onChange={(event) => handleChoiceChange(event, index)}
            sx={{ flexGrow: 1, mr: 2 }}
            multiline
          />
          <RadioGroup
            aria-label={`Right Choice for Choice ${index + 1}`}
            value={choice.rightChoice.toString()}
            onChange={(event) => handleRightChoiceChange(event, index)}
          >
            <FormControlLabel
              value={"true"}
              control={<Radio />}
              label="Correct"
            />
          </RadioGroup>
        </Box>
      ))}

      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        disabled={isLoading}
        startIcon={<AddIcon />}
      >
        {isLoading ? "Adding..." : "Add Question"}
      </Button>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Question Created"}
      />

      {isSuccess && (
        <Box sx={{ my: 2 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="button">
            QNO:{questionDataOnSuccess.id}
          </Typography>
          <Typography variant="h6">{questionDataOnSuccess.question}</Typography>
          <Typography variant="body1">
            -{questionDataOnSuccess.rightChoice.choice}
          </Typography>

          <AddQuestionImage questionId={questionDataOnSuccess.id} />
        </Box>
      )}
    </>
  );
};

export default AddQuestion;
