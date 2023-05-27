import React, { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";

import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import {
  useGetExamModelSetSectionsQuery,
  useDeleteExamModelSetSectionMutation,
} from "../../redux/ExamModelSetAPISlice";

import { useNavigate } from "react-router-dom";
import RouteConfig from "../../config/RouteConfig";
import AppSnackbar from "../../components/AppSnackbar";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import EditExamModelSetSection from "./EditExamModelSetSection";

const DisplayExamModelSetSection = () => {
  const navigate = useNavigate();
  const [selectedExamModelSetSection, setSelectedExamModelSetSection] =
    useState({ id: -1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);

  const [
    deleteExamModelSetSection,
    { isError: isErrorOnDelete, error: errorOnDelete },
  ] = useDeleteExamModelSetSectionMutation();

  const handleDeleteExamModelSetSection = (id) => {
    setSectionIdToDelete(id);
    handleConfirmationOpen();
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };
  const handleConfirm = () => {
    deleteExamModelSetSection(sectionIdToDelete);
    handleConfirmationClose();
  };

  const toggleEditSection = (selectedExamModelSetSection) => {
    setSelectedExamModelSetSection(selectedExamModelSetSection);
  };

  const {
    data: examModelSetSections,
    isLoading,
    error,
    isError,
  } = useGetExamModelSetSectionsQuery();

  const onClickExamModelSetSectionItem = (examModelSetSection) => {
    const data = { examModelSetSection: examModelSetSection };
    navigate(`/${RouteConfig.EXAM_MODEL_SET}`, { state: data });
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
        Exam Model Set Sections
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {examModelSetSections.map((examModelSetSection, index) =>
          selectedExamModelSetSection.id === examModelSetSection.id ? (
            <EditExamModelSetSection
              key={examModelSetSection.id}
              examModelSetSection={examModelSetSection}
              toggleEditExamModelSetSection={toggleEditSection}
            />
          ) : (
            <ListItem
              key={examModelSetSection.id}
              sx={{
                border: "1px solid grey",
                borderRadius: "5px",
                my: 2,
                cursor: "pointer",
              }}
              onClick={() => {
                onClickExamModelSetSectionItem(examModelSetSection);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ListItemText primary={examModelSetSection.title} />

              {hoveredIndex === index && (
                <>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleEditSection(examModelSetSection);
                    }}
                  >
                    <EditSharpIcon />
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteExamModelSetSection(examModelSetSection.id);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </>
              )}
            </ListItem>
          )
        )}
      </List>
      <AppSnackbar
        isOpen={isErrorOnDelete}
        autoHideDuration={4000}
        severity={"error"}
        message={errorOnDelete ? errorOnDelete.data.message : "Error on delete"}
      />
      <ConfirmationDialog
        title={"Confirm Delete"}
        description={"Are you sure you want to delete this item?"}
        open={confirmationOpen}
        handleClose={handleConfirmationClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default DisplayExamModelSetSection;
