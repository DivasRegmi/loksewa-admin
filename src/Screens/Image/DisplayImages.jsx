import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";

import {
  useGetAllImagesQuery,
  useDeleteImageMutation,
} from "../../redux/imageAPISlice";
import MyPagination from "../../components/MyPagination";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import AppSnackbar from "../../components/AppSnackbar";

const DisplayImages = () => {
  const [pageNo, setPageNo] = useState(0);
  const [selectedImageId, setselectedImageId] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [
    deleteImageMutation,
    { isError: isErrorOnDelete, error: errorOnDelete, isSuccess },
  ] = useDeleteImageMutation();

  const {
    data: imagesData,
    isLoading,
    isError,
    error,
  } = useGetAllImagesQuery({ pageNo: pageNo, pageSize: 50 });

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
      <Typography variant="h5" mt={2}>
        Images
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {imagesData.content.map((image, index) => (
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

      <Box sx={{ mb: 2 }}>
        <MyPagination
          pageNo={pageNo}
          totalPages={imagesData.paginationResponse.totalPages}
          onChangePage={(value) => setPageNo(value)}
        />
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

export default DisplayImages;
