import React from "react";
import { useLocation, useParams } from "react-router-dom";
import DisplayTopic from "./DisplayTopic";
import AddTopic from "./AddTopic";
import { Typography } from "@mui/material";

const TopicScreen = () => {
  const { section } = useLocation().state;

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {section.title}
      </Typography>
      <AddTopic sectionId={section.id} />
      <DisplayTopic sectionId={section.id} />
    </>
  );
};

export default TopicScreen;
