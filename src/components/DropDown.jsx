import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Dropdown(props) {
  const { label, options, selectedValue, onChange, disable } = props;

  return (
    <FormControl variant="outlined" fullWidth sx={{ mt: 2 }} >
      <InputLabel sx={{ pb: 1 }}>{label}</InputLabel>
      <Select
        value={selectedValue}
        onChange={onChange}
        label={label}
        disabled={disable}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Dropdown;
