import React from "react";
import Dropdown from "./DropDown";
import Loading from "./Loading";
import { useGetTopicsQuery } from "../redux/topicsAPISlice";
import ErrorDisplay from "./ErrorDisplay";
import { Typography } from "@mui/material";

const TopicsDropDownForOldQuestion = ({ selectedTopic, handleChange }) => {
  const SECTION_ID = {
    GK_OLD_QUESTION: 35,
    IQ_OLD_QUESTION: 36,
  };

  const {
    data: GK,
    isLoading: isLoadingGK,
    isError: isErrorGK,
    error: errorGK,
  } = useGetTopicsQuery(SECTION_ID.GK_OLD_QUESTION);
  const {
    data: IQ,
    isLoading: isLoadingIQ,
    isError: isErrorIQ,
    error: errorIQ,
  } = useGetTopicsQuery(SECTION_ID.IQ_OLD_QUESTION);

  if (isLoadingGK || isLoadingIQ) {
    return <Loading />;
  }

  if (isErrorIQ || isErrorGK) {
    let errMsg;
    if (errorIQ && errorIQ.data && errorIQ.data.message) {
      errMsg = errorIQ.data.message;
    } else if (errorGK && errorGK.data && errorGK.data.message) {
      errMsg = errorGK.data.message;
    } else {
      errMsg = "Something went wrong. Please try again later.";
    }

    return <ErrorDisplay message={errMsg} />;
  }

  const topics = [...GK, ...IQ];

  return (
    <>
      {topics.length > 0 ? (
        <Dropdown
          label="Topics"
          options={topics.map((topic) => ({
            value: topic.id,
            label: topic.title,
          }))}
          selectedValue={selectedTopic}
          onChange={handleChange}
        />
      ) : (
        <Typography sx={{ m: 2 }}>No more Topic to add.</Typography>
      )}
    </>
  );
};

export default TopicsDropDownForOldQuestion;
