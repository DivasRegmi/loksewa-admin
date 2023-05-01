import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import RouteConfig from "../config/RouteConfig";

const Navbar = styled(AppBar)({
  backgroundColor: "#3f51b5",
});

const LinkStyled = styled(NavLink)({
  color: "#fff",
  marginLeft: "1rem",
  textDecoration: "none",
});

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Navbar position="sticky">
      <Toolbar>
        <Typography
          sx={{ cursor: "pointer" }}
          variant="h6"
          color="inherit"
          onClick={() => {
            navigate("/");
          }}
        >
          Loksewa
        </Typography>
        <Box ml={"auto"}>
          <LinkStyled to="/">Home</LinkStyled>
          <LinkStyled to={RouteConfig.BANNER_SCREEN}>Banner</LinkStyled>
          <LinkStyled to={RouteConfig.SECTION_SCREEN}>Sections</LinkStyled>
          <LinkStyled to={RouteConfig.EVENT_SECTION_SCREEN}>Event</LinkStyled>
          <LinkStyled to={RouteConfig.NEWS_SECTION_SCREEN}>News</LinkStyled>
        </Box>
      </Toolbar>
    </Navbar>
  );
};

export default NavBar;
