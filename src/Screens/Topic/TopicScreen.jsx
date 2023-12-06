import React from "react";
import { useLocation } from "react-router-dom";
import DisplayTopic from "./DisplayTopic";
import AddTopic from "./AddTopic";
import { Typography } from "@mui/material";
import AddVideo from "../video/AddVideo";
import DisplayVideo from "../video/DisplayVideo";

const TopicScreen = () => {
  const { section } = useLocation().state;

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {section.title}
      </Typography>
      <AddTopic sectionId={section.id} />
      <DisplayTopic sectionId={section.id} />
      <AddVideo sectionId={section.id} />
      <DisplayVideo sectionId={section.id} />
    </>
  );
};

export default TopicScreen;
