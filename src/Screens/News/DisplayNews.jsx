import React, { useState } from "react";
import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import {
  useDeleteNewsMutation,
  useGetNewsBySectionIdQuery,
} from "../../redux/newsAPISlice";
import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import EditNews from "./EditNews";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import AppSnackbar from "../../components/AppSnackbar";
import MyPagination from "../../components/MyPagination";

const DisplayNews = ({ newsSectionId }) => {
  const [selectedNewsItem, setSelectedNewsItem] = useState({ id: -1 });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [pageNo, setPageNo] = useState(0);

  const {
    data: news,
    isLoading,
    error,
    isError,
  } = useGetNewsBySectionIdQuery({
    newsSectionId: newsSectionId,
    pageNo: pageNo,
    pageSize: 20,
  });

  const [deleteNews, { isError: isErrorOnDelete, error: errorOnDelete }] =
    useDeleteNewsMutation();

  const handleDeleteNews = (id) => {
    handleConfirmationOpen();
    setSectionIdToDelete(id);
  };
  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };
  const handleConfirm = () => {
    deleteNews(sectionIdToDelete);
    handleConfirmationClose();
  };

  const toggleEditNews = (selectedNewsItem) => {
    setSelectedNewsItem(selectedNewsItem);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
    return <ErrorDisplay message={error.error} />;
  }

  return (
    <>
      <Typography variant="h5" mt={2}>
        News
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {news.content.map((news) =>
          selectedNewsItem.id === news.id ? (
            <EditNews
              key={news.id}
              newsItem={news}
              toggleEditNews={toggleEditNews}
            />
          ) : (
            <ListItem
              key={news.id}
              sx={{
                border: "1px solid grey",
                borderRadius: "5px",
                my: 2,
                cursor: "pointer",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">{news.news}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {news.date}
                </Typography>
              </Box>
              <IconButton
                sx={{ ml: 5 }}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleEditNews(news);
                }}
              >
                <EditSharpIcon />
              </IconButton>

              <IconButton
                sx={{
                  ml: 1,
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteNews(news.id);
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </ListItem>
          )
        )}
      </List>
      <Box sx={{ mb: 2 }}>
        <MyPagination
          pageNo={pageNo}
          totalPages={news.paginationResponse.totalPages}
          onChangePage={(value) => setPageNo(value)}
        />
      </Box>

      <ConfirmationDialog
        title={"Confirm Delete"}
        description={"Are you sure you want to delete this item?"}
        open={confirmationOpen}
        handleClose={handleConfirmationClose}
        handleConfirm={handleConfirm}
      />
      <AppSnackbar
        isOpen={isErrorOnDelete}
        autoHideDuration={4000}
        severity={"error"}
        message={errorOnDelete ? errorOnDelete.data.message : "Error on delete"}
      />
    </>
  );
};

export default DisplayNews;
