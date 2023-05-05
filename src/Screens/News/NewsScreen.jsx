import { Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import DisplayNews from "./DisplayNews";
import AddNews from "./AddNews";

const NewsScreen = () => {
  const { newsSection } = useLocation().state;

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {newsSection.title}
      </Typography>

      <AddNews newsSectionId={newsSection.id} />

      <DisplayNews newsSectionId={newsSection.id} />
    </>
  );
};

export default NewsScreen;
