import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useGetSectionsByCategoryIdQuery } from "../../redux/sectionAPISlice ";
import {
  useAddSectionToCategoryMutation,
  useDeleteBySectionIdMutation,
} from "../../redux/categoryAPISlice";
import AppSnackbar from "../../components/AppSnackbar";
import RouteConfig from "../../config/RouteConfig";
import SectionsDropDownWithFilter from "../../components/SectionsDropDownWithFilter";

const AddSectionToCategoryScreen = () => {
  const { category } = useLocation().state;
  const navigate = useNavigate();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");
  const [error, setError] = useState(null);

  const [
    addSectionMutation,
    {
      isError: isErrorAddSection,
      error: errorAddSection,
      isSuccess,
      isLoading,
    },
  ] = useAddSectionToCategoryMutation();

  const {
    data: sectionData,
    isLoading: isLoadingGetSection,
    isError: isErrorGetSection,
    error: errorGetSection,
  } = useGetSectionsByCategoryIdQuery(category.id);

  const [
    deleteBySectionIdMutation,
    { isError: isErrorOnDelete, error: errorOnDelete },
  ] = useDeleteBySectionIdMutation();

  const handleDeleteBySectionId = (sectionId) => {
    deleteBySectionIdMutation({
      categoryId: category.id,
      sectionId: sectionId,
    });
  };

  const onPressSectionCard = (sectionId) => {
    const data = { categoryId: category.id, sectionId: sectionId };
    navigate(`/${RouteConfig.ADD_TOPIC_TO_CATEGORY_SCREEN}`, { state: data });
  };

  useEffect(() => {
    if (isSuccess) {
      setSelectedSection("");
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isErrorAddSection) {
      let errMsg;
      if (
        errorAddSection &&
        errorAddSection.data &&
        errorAddSection.data.message
      ) {
        errMsg = errorAddSection.data.message;
      } else {
        errMsg = "Something went wrong. Please try again later.";
      }

      setError(errMsg);
    }
  }, [isErrorAddSection, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSection.toString().trim()) {
      setError("Section is required");
      return;
    }

    addSectionMutation({
      categoryId: category.id,
      sectionId: selectedSection,
    });
  };

  if (isLoadingGetSection) {
    return <Loading />;
  }

  if (isErrorGetSection) {
    let errMsg;
    if (
      errorGetSection &&
      errorGetSection.data &&
      errorGetSection.data.message
    ) {
      errMsg = errorGetSection.data.message;
    } else {
      errMsg = "Something went wrong. Please try again later.";
    }

    return <ErrorDisplay message={errMsg} />;
  }

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  return (
    <>
      <SectionsDropDownWithFilter
        handleChange={handleSectionChange}
        selectedSection={selectedSection}
        disable={false}
        dataToFilter={sectionData}
      />
      {error && (
        <Typography sx={{ mt: 1 }} variant="subtitle2" color="error">
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        fullWidth
        startIcon={<AddIcon />}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Section"}
      </Button>

      <Typography variant="h5" mt={3}>
        Sections
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {sectionData.map((section, index) => (
          <Box
            key={index}
            sx={{
              width: "110px",
              ml: 2,
              mt: 2,
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onPressSectionCard(section.id)}
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
                src={section.image}
                alt={section.title}
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
              {section.title}
            </Typography>

            {hoveredIndex === index && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "white",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteBySectionId(section.id);
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Section added."}
      />

      <AppSnackbar
        isOpen={isErrorOnDelete}
        autoHideDuration={4000}
        severity={"error"}
        message={errorOnDelete ? errorOnDelete.data.message : "Error on delete"}
      />
    </>
  );
};

export default AddSectionToCategoryScreen;
