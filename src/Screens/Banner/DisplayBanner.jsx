import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Box, IconButton, Snackbar, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import {
  useDeleteBannerMutation,
  useGetBannersQuery,
} from "../../redux/bannerAPISlice";

const DisplayBanner = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { data: bannersData, isLoading, isError, error } = useGetBannersQuery();

  const [deleteBanner, { isError: isErrorOnDelete, error: errorOnDelete }] =
    useDeleteBannerMutation();

  const handleDeleteBanner = (name) => {
    // deleteBanner("name");
    deleteBanner(name);
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
                src={banner.url}
                alt={banner.name}
                style={{
                  width: "100%",
                  height: "auto",
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
              {banner.name}
            </Typography>
            {hoveredIndex === index && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "white",
                }}
                onClick={() => handleDeleteBanner(banner.name)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>

      <Snackbar
        open={isErrorOnDelete}
        autoHideDuration={1000}
        onClose={() => {}}
      >
        <Alert onClose={() => {}} severity="error" sx={{ width: "100%" }}>
          {errorOnDelete ? errorOnDelete.data.message : "Error on delete"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DisplayBanner;
