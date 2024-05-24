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
    BANKING_OLD_QUESTION: 48,
    TSC_OLD_QUESTION: 49,
    TECHNICAL_OLD_QUESTION: 50,
    ENGLISH_OLD_QUESTION: 52,
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

  const {
    data: BANKING,
    isLoading: isLoadingBANKING,
    isError: isErrorBANKING,
    error: errorBANKING,
  } = useGetTopicsQuery(SECTION_ID.BANKING_OLD_QUESTION);

  const {
    data: TSC,
    isLoading: isLoadingTSC,
    isError: isErrorTSC,
    error: errorTSC,
  } = useGetTopicsQuery(SECTION_ID.TSC_OLD_QUESTION);

  const {
    data: TECHNICA,
    isLoading: isLoadingTECHNICA,
    isError: isErrorTECHNICA,
    error: errorTECHNICA,
  } = useGetTopicsQuery(SECTION_ID.TECHNICAL_OLD_QUESTION);

  if (
    isLoadingGK ||
    isLoadingIQ ||
    isLoadingBANKING ||
    isLoadingTECHNICA ||
    isLoadingTSC
  ) {
    return <Loading />;
  }

  if (
    isErrorIQ ||
    isErrorGK ||
    isErrorBANKING ||
    isErrorTECHNICA ||
    isErrorTSC
  ) {
    let errMsg;
    if (errorIQ && errorIQ.data && errorIQ.data.message) {
      errMsg = errorIQ.data.message;
    } else if (errorGK && errorGK.data && errorGK.data.message) {
      errMsg = errorGK.data.message;
    } else if (errorBANKING && errorBANKING.data && errorBANKING.data.message) {
      errMsg = errorBANKING.data.message;
    } else if (
      errorTECHNICA &&
      errorTECHNICA.data &&
      errorTECHNICA.data.message
    ) {
      errMsg = errorTECHNICA.data.message;
    } else if (errorTSC && errorTSC.data && errorTSC.data.message) {
      errMsg = errorTSC.data.message;
    } else {
      errMsg = "Something went wrong. Please try again later.";
    }

    return <ErrorDisplay message={errMsg} />;
  }

  const topics = [...GK, ...IQ, ...BANKING, ...TSC, ...TECHNICA];

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
