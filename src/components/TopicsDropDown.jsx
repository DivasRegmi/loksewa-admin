import React from "react";
import Dropdown from "./DropDown";
import Loading from "./Loading";
import { useGetAllTopicsQuery } from "../redux/topicsAPISlice";
import ErrorDisplay from "./ErrorDisplay";

const TopicsDropDown = ({ selectedTopic, handleChange , disable}) => {
  const { data, isLoading, isError, error } = useGetAllTopicsQuery();

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
    <Dropdown
      disable={disable}
      label="Topics"
      options={data.map((topic) => ({
        value: topic.id,
        label: topic.title,
      }))}
      selectedValue={selectedTopic}
      onChange={handleChange}
    />
  );
};

export default TopicsDropDown;
