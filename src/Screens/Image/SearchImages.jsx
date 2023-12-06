import React, { useState } from "react";
import { Box, Divider, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";

import {
  useGetAllImagesByTagQuery,
  useDeleteImageMutation,
} from "../../redux/imageAPISlice";

import ConfirmationDialog from "../../components/ConfirmationDialog";
import AppSnackbar from "../../components/AppSnackbar";

const SearchImages = () => {
  const [tag, setTag] = useState(null);
  const [selectedImageId, setselectedImageId] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [
    deleteImageMutation,
    { isError: isErrorOnDelete, error: errorOnDelete },
  ] = useDeleteImageMutation();

  const {
    data: imagesData,
    isLoading,
    isError,
    error,
  } = useGetAllImagesByTagQuery(tag);

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

  const handleDeleteImage = () => {
    handleConfirmationOpen();
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };
  const handleConfirm = () => {
    deleteImageMutation(selectedImageId);
    handleConfirmationClose();
  };

  return (
    <>
      <TextField
        sx={{ mt: 2 }}
        label="Tag"
        fullWidth
        margin="normal"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />

      <Divider />

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {imagesData.map((image, index) => (
          <Box
            key={index}
            sx={{
              width: "320px",
              ml: 2,
              mt: 2,
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={() => {
              setHovered(true);
              setselectedImageId(image.id);
            }}
            onMouseLeave={() => setHovered(null)}
          >
            <Box
              sx={{
                marginBottom: "20px",
                width: "320px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={image.image}
                alt={image.tag}
                style={{
                  width: "320px",
                  height: "150px",
                  objectFit: "contain",
                }}
              />
            </Box>
            {hovered && selectedImageId === image.id && (
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
                    handleDeleteImage();
                  }}
                >
                  <DeleteIcon sx={{ color: "#FF2221", fontSize: 32 }} />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </Box>

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

export default SearchImages;
