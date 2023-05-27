import React from "react";
import Dropdown from "./DropDown";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import { useGetSectionsQuery } from "../redux/sectionAPISlice ";

const SectionsDropDown = ({ selectedSection, handleChange, disable }) => {
  const { data, isLoading, isError, error } = useGetSectionsQuery();

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
      label="Sections"
      options={data.map((section) => ({
        value: section.id,
        label: section.title,
      }))}
      selectedValue={selectedSection}
      onChange={handleChange}
    />
  );
};

export default SectionsDropDown;
