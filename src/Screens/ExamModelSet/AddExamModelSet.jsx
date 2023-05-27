import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import AppSnackbar from "../../components/AppSnackbar";
import { useAddExamModelSetMutation } from "../../redux/ExamModelSetAPISlice";
import SectionsDropDown from "../../components/SectionsDropDown";
import TopicsDropDown from "../../components/TopicsDropDown";

const AddExamModelSet = ({ examModelSetSectionId }) => {
  const [totalQuestions, setTotalQuestions] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [error, setError] = useState(null);

  const [
    addExamModelSetMutation,
    { isError, error: examModelSetError, isSuccess, isLoading },
  ] = useAddExamModelSetMutation();

  useEffect(() => {
    if (isSuccess) {
      setTotalQuestions("");
      setSelectedSection("");
      setSelectedTopic("");
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (examModelSetError && examModelSetError.data) {
        setError(examModelSetError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!totalQuestions.toString().trim()) {
      setError("Total Question is required");
      return;
    }
    if (
      !selectedSection.toString().trim() &&
      !selectedTopic.toString().trim()
    ) {
      setError("Section or Topic is required");
      return;
    }
    const body = {
      totalQuestions: totalQuestions,
      section: selectedSection
        ? {
            id: selectedSection,
          }
        : null,
      topic: selectedTopic
        ? {
            id: selectedTopic,
          }
        : null,
    };
    addExamModelSetMutation({
      examModelSetSectionId: examModelSetSectionId,
      body,
    });
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };
  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Add Exam Model Set
      </Typography>

      <FormControl fullWidth margin="normal" variant="outlined">
        <TextField
          sx={{ margin: 0 }}
          label="Total Question"
          fullWidth
          margin="normal"
          type="number"
          value={totalQuestions}
          error={Boolean(error)}
          onChange={(e) => setTotalQuestions(e.target.value)}
        />

        {error && (
          <Typography sx={{ mt: 1 }} variant="subtitle2" color="error">
            {error}
          </Typography>
        )}

        <SectionsDropDown
          handleChange={handleSectionChange}
          selectedSection={selectedSection}
          disable={Boolean(selectedTopic)}
        />
        <TopicsDropDown
          handleChange={handleTopicChange}
          selectedTopic={selectedTopic}
          disable={Boolean(selectedSection)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 1 }}
          startIcon={<AddIcon />}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Add Exam Model Set Section"}
        </Button>
      </FormControl>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Exam Model Set Section Created"}
      />
    </>
  );
};

export default AddExamModelSet;
