import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import SectionsDropDown from "../../components/SectionsDropDown";
import { useGetSectionsByCategoryIdQuery } from "../../redux/sectionAPISlice ";
import { useAddSectionToCategoryMutation } from "../../redux/categoryAPISlice";
import AppSnackbar from "../../components/AppSnackbar";

const AddSectionToCategoryScreen = () => {
  const { category } = useLocation().state;

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
      <SectionsDropDown
        handleChange={handleSectionChange}
        selectedSection={selectedSection}
        disable={false}
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
            }}
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
          </Box>
        ))}
      </Box>
      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Section added."}
      />
    </>
  );
};

export default AddSectionToCategoryScreen;
