import React from "react";
import { useLocation } from "react-router-dom";
import DisplayEvent from "./DisplayEvent";
import { Typography } from "@mui/material";
import AddEvent from "./AddEvent";

const EventScreen = () => {
  const { eventSection } = useLocation().state;
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {eventSection.title}
      </Typography>

      <AddEvent eventSectionId={eventSection.id} />

      <DisplayEvent eventSectionId={eventSection.id} />
    </>
  );
};

export default EventScreen;
