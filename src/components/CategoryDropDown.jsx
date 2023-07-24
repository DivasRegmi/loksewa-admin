import React from "react";
import Dropdown from "./DropDown";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import { useGetCategoryQuery } from "../redux/categoryAPISlice";

const CategoryDropDown = ({ selectedCategory, handleChange, disable }) => {
  const { data, isLoading, isError, error } = useGetCategoryQuery();

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
      label="Category"
      options={data.map((category) => ({
        value: category.id,
        label: category.title,
      }))}
      selectedValue={selectedCategory}
      onChange={handleChange}
    />
  );
};

export default CategoryDropDown;
