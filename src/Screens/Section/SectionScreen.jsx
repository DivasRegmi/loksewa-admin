import React from "react";
import DisplaySections from "./DisplaySections";
import AddSection from "./AddSection";
import { Divider } from "@mui/material";


const SectionScreen = (props) => {
  return (
    <>
      <AddSection />
      <Divider sx={{ mt: 2 }} />
      <DisplaySections />
    

    </>
  );
};

export default SectionScreen;
