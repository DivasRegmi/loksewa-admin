import { useState, useEffect } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";

import { Add as AddIcon } from "@mui/icons-material";
import { format } from "date-fns";
import { useAddNewsMutation } from "../../redux/newsAPISlice";
import AppSnackbar from "../../components/AppSnackbar";

const AddNews = ({ newsSectionId }) => {
  const [news, setNews] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [error, setError] = useState(null);

  const [addNewsMutation, { isError, error: newsError, isSuccess, isLoading }] =
    useAddNewsMutation();

  useEffect(() => {
    if (isSuccess) {
      setNews("");
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (newsError && newsError.data) {
        console.log(newsError);
        setError(newsError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      news: news,
      date: date,
    };

    if (!news.trim()) {
      setError("Title is required");
      return;
    }

    addNewsMutation({
      newsSectionId: newsSectionId,
      body: body,
    });
  };

  const handleToday = () => {
    const todayDate = new Date();
    const formattedDate = format(todayDate, "yyyy-MM-dd");
    setDate(formattedDate);
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = format(tomorrow, "yyyy-MM-dd");
    setDate(formattedDate);
  };

  const handleYesterday = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 1);
    const formattedDate = format(tomorrow, "yyyy-MM-dd");
    setDate(formattedDate);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" mt={2}>
        Add News
      </Typography>

      <TextField
        id="news"
        name="news"
        label="News"
        fullWidth
        margin="normal"
        value={news}
        onChange={(e) => setNews(e.target.value)}
      />

      {error && (
        <Typography variant="subtitle2" color="error">
          {error}
        </Typography>
      )}

      <TextField
        key={date}
        id="date"
        name="date"
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1 }}>
        <IconButton onClick={handleYesterday} sx={{ mr: 1 }}>
          <Typography variant="srOnly">Yesterday</Typography>
          <DateRangeIcon />
        </IconButton>
        <IconButton onClick={handleToday} sx={{ mr: 1 }}>
          <Typography variant="srOnly">Today</Typography>
          <DateRangeIcon />
        </IconButton>
        <IconButton onClick={handleTomorrow}>
          <Typography variant="srOnly">Tomorrow</Typography>
          <DateRangeIcon />
        </IconButton>
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
        {isLoading ? "Adding..." : " Add News"}
      </Button>

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"News Created"}
      />
    </Box>
  );
};

export default AddNews;
