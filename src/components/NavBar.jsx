import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import RouteConfig from "../config/RouteConfig";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Navbar = styled(AppBar)({
  backgroundColor: "#3f51b5",
});

const LinkStyled = styled(NavLink)({
  color: "#fff",
  marginLeft: "1rem",
  textDecoration: "none",
  "&.active": {
    fontWeight: "bold",
  },
});

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate(RouteConfig.LOGIN_SCREEN);
  };

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
          <LinkStyled to={RouteConfig.USERS_SCREEN}>Users</LinkStyled>
          <LinkStyled to={RouteConfig.PAYMENT}>Payment</LinkStyled>
          <LinkStyled to={RouteConfig.BANNER_SCREEN}>Banner</LinkStyled>
          <LinkStyled to={RouteConfig.CATEGORY_SCREEN}>Category</LinkStyled>
          <LinkStyled to={RouteConfig.SECTION_SCREEN}>Sections</LinkStyled>
          <LinkStyled to={RouteConfig.VACENCY_SCREEN}>Vacency</LinkStyled>
          <LinkStyled to={RouteConfig.SEARCH_QUESTION}>Question</LinkStyled>
          <LinkStyled to={RouteConfig.QUESTION_REPORT}>Report</LinkStyled>
          <LinkStyled to={RouteConfig.EXAM_SCREEN}>Exam</LinkStyled>
          <LinkStyled to={RouteConfig.EXAM_MODEL_SET_SECTION}>
            Exam Model
          </LinkStyled>
          <LinkStyled to={RouteConfig.IMAGE_SCREEN}>Images</LinkStyled>
          <LinkStyled to={RouteConfig.LOGIN_SCREEN} onClick={handleLogout}>
            Logout
          </LinkStyled>
        </Box>
      </Toolbar>
    </Navbar>
  );
};

export default NavBar;
