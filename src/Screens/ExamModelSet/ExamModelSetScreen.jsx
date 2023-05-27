import React from "react";
import AddExamModelSet from "./AddExamModelSet";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import DisplayExamModelSet from "./DisplayExamModelSet";

const ExamModelSetScreen = () => {
  const { examModelSetSection } = useLocation().state;
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {examModelSetSection.title}
      </Typography>

      <AddExamModelSet examModelSetSectionId={examModelSetSection.id} />
      <DisplayExamModelSet examModelSetSectionId={examModelSetSection.id} />
    </>
  );
};

export default ExamModelSetScreen;
