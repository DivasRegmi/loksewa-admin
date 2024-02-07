import React, { useState } from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ModeEditSharpIcon from "@mui/icons-material/ModeEditSharp";

import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";

import { useGetCategoryQuery } from "../../redux/categoryAPISlice";
import EditCategory from "./EditCategory";
import RouteConfig from "../../config/RouteConfig";

const DisplayCatogory = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();

  const {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useGetCategoryQuery();

  const toggleEditCategory = (selectedCategory) => {
    setShowEditCategory((prevData) => !prevData);
    setSelectedCategory(selectedCategory);
  };

  const onClickCategory = (category) => {
    const data = { category: category };
    navigate(`/${RouteConfig.ADD_SECTION_TO_CATEGORY_SCREEN}`, { state: data });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    let errMsg;
    if (error && error.data && error.data.message) {
      errMsg = error.data.message;
    } else {
      errMsg = "Something went wrong. Please try again later.";
    }

    return <ErrorDisplay message={errMsg} />;
  }

  return (
    <>
      <Typography variant="h5" mt={2}>
        Categories
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent:"space-around" }}>
        {categoryData.map((category, index) => (
          <Box
            key={index}
            sx={{
              width: "110px",
              mt: 2,
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onClickCategory(category)}
          >
            <Box
              sx={{
                marginBottom: "20px",
                width: "110px",
                height: "100px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={category.image}
                alt={category.title}
                style={{
                  width: "auto",
                  height: "100px",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                textAlign: "center",
              }}
            >
              {category.title}
            </Typography>
            {hoveredIndex === index && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleEditCategory(category);
                }}
              >
                <ModeEditSharpIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>

      {showEditCategory && (
        <>
          <Divider sx={{ mt: 2 }} />
          <EditCategory
            category={selectedCategory}
            toggleEditCategory={toggleEditCategory}
          />
        </>
      )}
    </>
  );
};

export default DisplayCatogory;
