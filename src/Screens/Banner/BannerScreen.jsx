import React from "react";
import {
  Box,
  Divider,
} from "@mui/material";
import AddBanner from "./AddBanner";
import DisplayBanner from "./DisplayBanner";

const BannerScreen = () => {
  return (
    <Box>
      <AddBanner />

      <Divider sx={{mt:2}}/>

      <DisplayBanner />
    </Box>
  );
};

export default BannerScreen;
