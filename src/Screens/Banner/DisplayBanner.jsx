import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import {
  useDeleteBannerMutation,
  useGetBannersQuery,
} from "../../redux/bannerAPISlice";
import AppSnackbar from "../../components/AppSnackbar";

const DisplayBanner = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { data: bannersData, isLoading, isError, error } = useGetBannersQuery();

  const [deleteBanner, { isError: isErrorOnDelete, error: errorOnDelete }] =
    useDeleteBannerMutation();

  const handleDeleteBanner = (id) => {
    deleteBanner(id);
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
        Banners
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {bannersData.map((banner, index) => (
          <Box
            key={index}
            sx={{ width: "350px", ml: 2, mt: 2, position: "relative" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Box
              sx={{
                marginBottom: "20px",
                width: "350px",
                height: "150px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={banner.image}
                alt={banner.tag}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>

            {hoveredIndex === index && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "white",
                }}
                onClick={() => handleDeleteBanner(banner.id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>

      <AppSnackbar
        isOpen={isErrorOnDelete}
        autoHideDuration={4000}
        severity={"error"}
        message={errorOnDelete ? errorOnDelete.data.message : "Error on delete"}
      />
    </>
  );
};

export default DisplayBanner;
