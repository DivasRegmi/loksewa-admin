import React from "react";
import DisplayNewsSection from "./DisplayNewsSection";
import AddNewsSection from "./AddNewsSection";
import { Divider } from "@mui/material";

const NewsSectionScreen = () => {
  return (
    <>
      <AddNewsSection />
      <Divider sx={{ mt: 2 }} />
      <DisplayNewsSection />
    </>
  );
};

export default NewsSectionScreen;
