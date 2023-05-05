import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AddQuestion from "./AddQuestion";
import DisplayQuestion from "./DisplayQuestion";
import { Button, Typography } from "@mui/material";

const QuestionScreen = () => {
  const { topic } = useLocation().state;
  const [visibleDisplayQuestion, setVisibleDisplayQuestion] = useState(false);

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {topic.title}
      </Typography>

      <AddQuestion topicId={topic.id} />
      {visibleDisplayQuestion ? (
        <DisplayQuestion topicId={topic.id} />
      ) : (
        <Button
          variant="contained"
          onClick={() => setVisibleDisplayQuestion(true)}
          sx={{ mt: 2 }}
        >
          Display Question
        </Button>
      )}
    </>
  );
};

export default QuestionScreen;
