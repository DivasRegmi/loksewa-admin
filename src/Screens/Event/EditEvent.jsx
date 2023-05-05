import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useUpdateEventMutation } from "../../redux/eventAPISlice";
import AppSnackbar from "../../components/AppSnackbar";

const EditEvent = ({ event, toggleEditEvent }) => {
  const [title, setTitle] = useState(event.title);
  const [day, setDay] = useState(event.day ? event.day : "");
  const [month, setMonth] = useState(event.month ? event.month : "");
  const [year, setYear] = useState(event.year ? event.year : "");
  const [type, setType] = useState(event.type);
  const [error, setError] = useState(null);

  const [
    updateEventMutation,
    { isError, error: eventError, isSuccess, isLoading },
  ] = useUpdateEventMutation();

  useEffect(() => {
    if (isSuccess) {
      toggleEditEvent({ id: -1 });
      setTitle("");
      setDay("");
      setMonth("");
      setYear("");
      setType("AD");
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (eventError && eventError.data) {
        console.log(eventError);

        setError(
          eventError.data.day ||
            eventError.data.month ||
            eventError.data.year ||
            eventError.data.message
        );
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title: title,
      day: day,
      month: month,
      year: year,
      type: type,
    };

    if (!title.trim()) {
      setError("Title field is required");
      return;
    }
    if (!day.toString().trim()) {
      setError("Day field is required");
      return;
    }

    updateEventMutation({
      eventId: event.id,
      body: body,
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="title"
        name="title"
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {error && (
        <Typography variant="subtitle2" color="error">
          {error}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          id="day"
          name="day"
          label="Day"
          type="number"
          fullWidth
          margin="normal"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          inputProps={{
            min: 1,
            max: 32,
          }}
        />

        <TextField
          id="month"
          name="month"
          label="Month"
          type="number"
          fullWidth
          margin="normal"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          inputProps={{
            min: 1,
            max: 12,
          }}
        />

        <TextField
          id="year"
          name="year"
          label="Year"
          type="number"
          fullWidth
          margin="normal"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <TextField
          id="type"
          name="type"
          label="Type"
          select
          fullWidth
          margin="normal"
          value={type}
          onChange={(e) => setType(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          <option value="BS">BS</option>
          <option value="AD">AD</option>
        </TextField>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 1 }}
        startIcon={<AddIcon />}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : " Update Event"}
      </Button>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Event Created"}
      />
    </Box>
  );
};
export default EditEvent;
