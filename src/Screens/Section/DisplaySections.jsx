import React, { useState } from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ModeEditSharpIcon from "@mui/icons-material/ModeEditSharp";

import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";

import { useGetSectionsQuery } from "../../redux/sectionAPISlice ";
import EditSection from "./EditSection";
import RouteConfig from "../../config/RouteConfig";

const DisplaySections = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showEditSection, setShowEditSection] = useState(false);
  const [selectedSection, setSelectedSection] = useState();

  const {
    data: sectionData,
    isLoading,
    isError,
    error,
  } = useGetSectionsQuery();

  const toggleEditSection = (selectedSection) => {
    setShowEditSection((prevData) => !prevData);
    setSelectedSection(selectedSection);
  };
  const onClickSection = (section) => {
    const data = { section: section };
    navigate(`/${RouteConfig.TOPIC_SCREEN}`, { state: data });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
    return <ErrorDisplay message={error.error} />;
  }

  return (
    <>
      <Typography variant="h5" mt={2}>
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
            onClick={() => onClickSection(section)}
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
                  top: 2,
                  right: 2,
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleEditSection(section);
                }}
              >
                <ModeEditSharpIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>

      {showEditSection && (
        <>
          <Divider sx={{ mt: 2 }} />
          <EditSection
            section={selectedSection}
            toggleEditSection={toggleEditSection}
          />
        </>
      )}
    </>
  );
};

export default DisplaySections;
