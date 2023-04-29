import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box p={2}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
