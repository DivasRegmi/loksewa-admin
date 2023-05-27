import React, { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import {
  useDeleteExamModelSetMutation,
  useGetExamModelSetsBySectionIdQuery,
} from "../../redux/ExamModelSetAPISlice";

import AppSnackbar from "../../components/AppSnackbar";
import ConfirmationDialog from "../../components/ConfirmationDialog";

const DisplayExamModelSet = ({ examModelSetSectionId }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);

  const [
    deleteExamModelSet,
    { isError: isErrorOnDelete, error: errorOnDelete },
  ] = useDeleteExamModelSetMutation();

  const handleDeleteExamModelSet = (id) => {
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
    deleteExamModelSet(sectionIdToDelete);
    handleConfirmationClose();
  };

  const {
    data: examModelSets,
    isLoading,
    error,
    isError,
  } = useGetExamModelSetsBySectionIdQuery(examModelSetSectionId);

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
        {examModelSets.map((examModelSet, index) => (
          <ListItem
            key={examModelSet.id}
            sx={{
              border: "1px solid grey",
              borderRadius: "5px",
              my: 2,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <ListItemText
              primary={
                examModelSet.section
                  ? `Section: ${examModelSet.section.title}`
                  : `Topic: ${examModelSet.topic.title}`
              }
              secondary={`Total Question: ${examModelSet.totalQuestions}`}
            />

            {hoveredIndex === index && (
              <>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteExamModelSet(examModelSet.id);
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
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

export default DisplayExamModelSet;
