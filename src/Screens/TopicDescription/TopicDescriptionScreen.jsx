import React from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import AddTopicDescription from "./AddTopicDescription";
import DisplayTopicDescription from "./DisplayTopicDescription";

const TopicDescriptionScreen = () => {
  const { topic } = useLocation().state;
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {topic.title}
      </Typography>
      <AddTopicDescription topicId={topic.id} />
      <DisplayTopicDescription topicId={topic.id} />
    </>
  );
};

export default TopicDescriptionScreen;
