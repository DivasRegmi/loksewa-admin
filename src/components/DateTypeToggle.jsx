import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const DateTypeToggle = ({ dateType, setDateType }) => {
  const handleDateTypeChange = (event, newDateType) => {
    setDateType(newDateType);
  };

  return (
    <ToggleButtonGroup
      value={dateType}
      exclusive
      onChange={handleDateTypeChange}
      aria-label="date-type-toggle"
    >
      <ToggleButton value="AD" aria-label="AD">
        AD
      </ToggleButton>
      <ToggleButton value="BS" aria-label="BS">
        BS
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DateTypeToggle;
