import React from "react";
import Dropdown from "./DropDown";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import { useGetSectionsQuery } from "../redux/sectionAPISlice ";
import { Typography } from "@mui/material";

const SectionsDropDownWithFilter = ({
  selectedSection,
  handleChange,
  disable,
  dataToFilter,
}) => {
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

  const filteredSection = data.filter(
    (obj) => !dataToFilter.some((section) => section.id === obj.id)
  );

  return (
    <>
      {filteredSection.length > 0 ? (
        <Dropdown
          disable={disable}
          label="Sections"
          options={filteredSection.map((section) => ({
            value: section.id,
            label: section.title,
          }))}
          selectedValue={selectedSection}
          onChange={handleChange}
        />
      ) : (
        <Typography sx={{ m: 2 }}>No more Section to add.</Typography>
      )}
    </>
  );
};

export default SectionsDropDownWithFilter;
