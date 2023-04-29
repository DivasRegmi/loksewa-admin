import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";

const Navbar = styled(AppBar)({
  backgroundColor: "#3f51b5",
});

const LinkStyled = styled(NavLink)({
  color: "#fff",
  marginLeft: "1rem",
  textDecoration: "none",
});

const NavBar = () => {
  return (
    <Navbar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          My App
        </Typography>
        <Box ml={"auto"}>
          <LinkStyled to="/">Home</LinkStyled>
          <LinkStyled to="/about">About</LinkStyled>
          <LinkStyled to="/contact">Contact</LinkStyled>
          <LinkStyled to="/BannerScreen">Banner</LinkStyled>
        </Box>
      </Toolbar>
    </Navbar>
  );
};

export default NavBar;
