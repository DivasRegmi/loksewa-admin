import React from "react";
import Dropdown from "./DropDown";
import Loading from "./Loading";
import { useGetTopicsQuery } from "../redux/topicsAPISlice";
import ErrorDisplay from "./ErrorDisplay";
import { Typography } from "@mui/material";

const TopicsDropDownBySectionId = ({
  selectedTopic,
  handleChange,
  disable,
  sectionId,
  topicsInCategory,
}) => {
  const { data, isLoading, isError, error } = useGetTopicsQuery(sectionId);

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
  const filteredTopics = data.filter(
    (obj) => !topicsInCategory.some((topic) => topic.id === obj.id)
  );

  return (
    <>
      {filteredTopics.length > 0 ? (
        <Dropdown
          disable={disable}
          label="Topics"
          options={filteredTopics.map((topic) => ({
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

export default TopicsDropDownBySectionId;
