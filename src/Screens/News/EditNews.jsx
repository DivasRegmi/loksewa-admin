import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";
import { useUpdateNewsMutation } from "../../redux/newsAPISlice";

const EditNews = ({ newsItem, toggleEditNews }) => {
  const [news, setNews] = useState(newsItem.news);
  const [date, setDate] = useState(
    new Date(newsItem.date).toLocaleDateString("en-CA")
  );
  const [error, setError] = useState(null);

  const [
    updateNewsMutation,
    { isError, error: newsError, isSuccess, isLoading },
  ] = useUpdateNewsMutation();

  useEffect(() => {
    if (isSuccess) {
      setNews("");
      setError(null);
      toggleEditNews({ id: -1 });
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

    if (!news.trim()) {
      setError("Title is required");
      return;
    }

    const body = {
      news: news,
      date: date,
    };

    updateNewsMutation({
      newsId: newsItem.id,
      body: body,
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="news"
        name="news"
        label="News"
        fullWidth
        margin="normal"
        value={news}
        onChange={(e) => setNews(e.target.value)}
      />
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

      {error && (
        <Typography variant="subtitle2" color="error">
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 1 }}
        startIcon={<AddIcon />}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : " Update News"}
      </Button>
    </Box>
  );
};

export default EditNews;
