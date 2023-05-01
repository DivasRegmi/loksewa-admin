import React from "react";
import AddEventSection from "./AddEventSection";
import { Divider } from "@mui/material";
import DisplayEventSection from "./DisplayEventSection";

const EventSectionScreen = () => {
  return (
    <>
      <AddEventSection />
      <Divider sx={{ mt: 2 }} />
      <DisplayEventSection />
    </>
  );
};

export default EventSectionScreen;
