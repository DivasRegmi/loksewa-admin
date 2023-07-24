import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AppSnackbar from "../../components/AppSnackbar";
import AddQuestionImage from "./AddQuestionImage";
import ConfirmationDialog from "../../components/ConfirmationDialog";

import { useDeleteQuestionSolutionDescriptionMutation } from "../../redux/QuestionSolutionDescriptionAPISlice";
import AddQuestionSolutionDescription from "./AddQuestionSolutionDescription";

const DisplayQuestionSolution = ({
  questionSolution,
  questionId,
  onSuccuss,
}) => {
  const [hovered, setHovered] = useState(null);
  const [displayEditSolution, setDisplayEditSolution] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [
    deleteQuestionSolutionDescriptionMutation,
    { isError: isErrorOnDelete, error: errorOnDelete, isSuccess },
  ] = useDeleteQuestionSolutionDescriptionMutation();

  useEffect(() => {
    if (isSuccess && typeof onSuccuss === "function") {
      onSuccuss();
    }
  }, [isSuccess]);

  const handleDeleteQuestionSolutionDescription = () => {
    handleConfirmationOpen();
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };
  const handleConfirm = () => {
    deleteQuestionSolutionDescriptionMutation(questionId);
    handleConfirmationClose();
  };

  return (
    <>
      {questionSolution != null ? (
        <Box
          p={2}
          sx={{ position: "relative" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(null)}
        >
          <Typography variant="h5" sx={{ m: 2, ml: 0, pl: 0 }}>
            Solution
          </Typography>
          {questionSolution.image && (
            <img
              src={questionSolution.image}
              alt="Question Solution Description Img"
              style={{
                maxWidth: "350px",
                height: 150,
                borderRadius: 5,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          )}

          {questionSolution.description && (
            <Typography>{questionSolution.description}</Typography>
          )}

          {hovered && (
            <Box
              sx={{
                bgcolor: "rgba(0,0,0,0.4)",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                zIndex: 1,
              }}
            >
              <IconButton
                onClick={(e) => {
                  handleDeleteQuestionSolutionDescription();
                }}
              >
                <DeleteIcon sx={{ color: "#FF2221", fontSize: 32 }} />
              </IconButton>
            </Box>
          )}
        </Box>
      ) : displayEditSolution ? (
        <AddQuestionSolutionDescription
          questionId={questionId}
          onSuccuss={() => {
            if (typeof onSuccuss === "function") {
              onSuccuss();
            }

            setDisplayEditSolution(false);
          }}
        />
      ) : (
        <Button
          onClick={() => {
            setDisplayEditSolution(true);
          }}
        >
          Add Solution
        </Button>
      )}
      <ConfirmationDialog
        title={"Confirm Delete"}
        description={"Are you sure you want to delete this item?"}
        open={confirmationOpen}
        handleClose={handleConfirmationClose}
        handleConfirm={handleConfirm}
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

export default DisplayQuestionSolution;
