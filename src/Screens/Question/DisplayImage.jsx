import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useDeleteQuestionImageMutation } from "../../redux/QuestionsAPISlice";
import AppSnackbar from "../../components/AppSnackbar";
import AddQuestionImage from "./AddQuestionImage";

const DisplayImage = ({ src, questionId, onSuccuss }) => {
  const [hovered, setHovered] = useState(null);
  const [displayEditImage, setDisplayEditImage] = useState(false);

  const [
    deleteQuestionImageMutation,
    { isError: isErrorOnDelete, error: errorOnDelete, isSuccess },
  ] = useDeleteQuestionImageMutation();

  const handleDeleteQuestionImage = () => {
    deleteQuestionImageMutation(questionId);
  };

  useEffect(() => {
    if (isSuccess && typeof onSuccuss === "function") {
      onSuccuss();
    }
  }, [isSuccess]);

  return (
    <>
      {src != null ? (
        <Box
          p={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            src={src}
            alt="Question Image"
            style={{
              maxWidth: "350px",
              height: 150,
              borderRadius: 5,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

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
                  handleDeleteQuestionImage();
                }}
              >
                <DeleteIcon sx={{ color: "#FF2221", fontSize: 32 }} />
              </IconButton>
            </Box>
          )}
        </Box>
      ) : displayEditImage ? (
        <AddQuestionImage
          questionId={questionId}
          onSuccuss={() => {
            if (typeof onSuccuss === "function") {
              onSuccuss();
            }

            setDisplayEditImage(false);
          }}
        />
      ) : (
        <Button
          onClick={() => {
            setDisplayEditImage(true);
          }}
        >
          Add Image
        </Button>
      )}
      <AppSnackbar
        isOpen={isErrorOnDelete}
        autoHideDuration={4000}
        severity={"error"}
        message={errorOnDelete ? errorOnDelete.data.message : "Error on delete"}
      />
    </>
  );
};

export default DisplayImage;
