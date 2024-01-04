import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AddQuestionFromExam from "./AddQuestionFromExam";
import TopicsDropDownForOldQuestion from "../../components/TopicsDropDownForOldQuestion";
import { Box } from "@mui/material";

function AddQuestionsManuallyScreen() {
  const { exam } = useLocation().state;
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  console.log(selectedTopic);
  return (
    <div>
      <Box style={{ marginBottom: 20 }}>
        <TopicsDropDownForOldQuestion
          handleChange={handleTopicChange}
          selectedTopic={selectedTopic}
        />
      </Box>
      {selectedTopic ? <AddQuestionFromExam topicId={selectedTopic} /> : null}
    </div>
  );
}

export default AddQuestionsManuallyScreen;
