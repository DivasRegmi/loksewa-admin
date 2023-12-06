import { Typography } from "@mui/material";
import React from "react";
import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import { useGetVideoQuery } from "../../redux/videoAPISlice";

const DisplayVideo = ({ sectionId }) => {

  const {
    data: video,
    isLoading,
    error,
    isError,
  } = useGetVideoQuery(sectionId);

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
        Video playlist id
      </Typography>

      <Typography>{video.playlistId}</Typography>
    </>
  );
};

export default DisplayVideo;
