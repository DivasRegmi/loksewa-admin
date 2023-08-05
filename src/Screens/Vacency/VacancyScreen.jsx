import React from "react";
import { Typography } from "@mui/material";
import AddTopicDescription from "./AddVacancy";
import DisplayTopicDescription from "./DisplayVacancy";
import AddVacancy from "./AddVacancy";
import DisplayVacancy from "./DisplayVacancy";

const VacancyScreen = () => {
  return (
    <>
      <AddVacancy />
      <DisplayVacancy />
    </>
  );
};

export default VacancyScreen;
