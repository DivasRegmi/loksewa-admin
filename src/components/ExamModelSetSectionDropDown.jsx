import React from "react";
import Dropdown from "./DropDown";
import Loading from "./Loading";
import { useGetExamModelSetSectionsQuery } from "../redux/ExamModelSetAPISlice";
import ErrorDisplay from "./ErrorDisplay";

const ExamModelSetSectionDropDown = ({ selectedSection, handleChange }) => {
  const { data, isLoading, isError, error } = useGetExamModelSetSectionsQuery();

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
      label="Exam Model Set Section"
      options={data.map((section) => ({
        value: section.id,
        label: section.title,
      }))}
      selectedValue={selectedSection}
      onChange={handleChange}
    />
  );
};

export default ExamModelSetSectionDropDown;
