import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TopicsDropDownForOldQuestion from "../../components/TopicsDropDownForOldQuestion";
import { Box } from "@mui/material";
import { useAddQuestionsToExamByQuestionIdMutation } from "../../redux/ExamAPISlice";
import AddQuestion from "../Question/AddQuestion";

function AddQuestionsManuallyScreen() {
  const { exam } = useLocation().state;
  const [selectedTopic, setSelectedTopic] = useState("");

  const [addQuestionToExam] = useAddQuestionsToExamByQuestionIdMutation();

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleAddQuestionToExam = (questionId) => {
    addQuestionToExam({
      examId: exam.id,
      questionId: questionId,
    });
  };

  return (
    <div>
      <Box style={{ marginBottom: 20 }}>
        <TopicsDropDownForOldQuestion
          handleChange={handleTopicChange}
          selectedTopic={selectedTopic}
        />
      </Box>
      {selectedTopic ? (
        <AddQuestion
          topicId={selectedTopic}
          handleAddQuestionToExam={handleAddQuestionToExam}
        />
      ) : null}
    </div>
  );
}

export default AddQuestionsManuallyScreen;
