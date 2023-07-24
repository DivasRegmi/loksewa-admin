import React from "react";
import { Button, Divider } from "@mui/material";
import DisplayImages from "./DisplayImages";
import { useNavigate } from "react-router-dom";
import RouteConfig from "../../config/RouteConfig";

const ImageScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => navigate(`/${RouteConfig.IMAGE_ADD_SCREEN}`)}
      >
        Add Images
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate(`/${RouteConfig.IMAGE_SEARCH_SCREEN}`)}
        sx={{ ml: 2 }}
      >
        Search By Tag
      </Button>
      <Divider />
      <DisplayImages />
    </>
  );
};

export default ImageScreen;
