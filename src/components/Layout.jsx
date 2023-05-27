import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const Layout = () => {
  const { isAuthenticated } = useSelector(selectUser);

  return (
    <>
      {isAuthenticated && <NavBar />}
      <Box p={2}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
