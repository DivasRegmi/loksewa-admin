import React from "react";
import DisplayCatogory from "./DisplayCatogory";
import AddCategory from "./AddCategory";
import { Divider } from "@mui/material";


const CategoryScreen = () => {
  return (
    <>
      <AddCategory />
      <Divider sx={{ mt: 2 }} />
      <DisplayCatogory />
    </>
  );
};

export default CategoryScreen;
