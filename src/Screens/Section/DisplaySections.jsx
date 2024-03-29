import React, { useState } from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ModeEditSharpIcon from "@mui/icons-material/ModeEditSharp";

import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";

import {
  useGetSectionsGroupQuery,
} from "../../redux/sectionAPISlice ";
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
  } = useGetSectionsGroupQuery();

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
      {Object.keys(sectionData).map((type) => (
        <Box
          key={type}
          sx={{
            borderWidth: 10,
            borderRadius: 2,
            backgroundColor: "#f7f7f7",
            marginBottom: 2,
            padding: 2,
          }}
        >
          <Typography variant="h5" my={2}>
            {type}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap",}}>
            {sectionData[type].map((section, index) => (
              <Box
                key={index}
                sx={{
                  width: "110px",
                  ml: 2,
                  mt: 2,
                  position: "relative",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredIndex(section.id)}
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
                {hoveredIndex === section.id && (
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
        </Box>
      ))}

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
