import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { Add as AddIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

import ErrorDisplay from "../../components/ErrorDisplay";
import { useGetTopicsBySectionIdAndCategoryIdQuery } from "../../redux/topicsAPISlice";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import TopicsDropDownBySectionId from "../../components/TopicsDropDownBySectionId";
import {
  useAddTopicToCategoryMutation,
  useDeleteByTopicIdMutation,
} from "../../redux/categoryAPISlice";
import AppSnackbar from "../../components/AppSnackbar";

const AddTopicToCategoryScreen = () => {
  const { categoryId, sectionId } = useLocation().state;
  const [selectedTopic, setSelectedTopic] = useState("");
  const [error, setError] = useState(null);
  const {
    data: topics,
    isLoading,
    error: errorTopic,
    isError,
  } = useGetTopicsBySectionIdAndCategoryIdQuery({ sectionId, categoryId });

  const [
    addTopicMutation,
    {
      isError: isErrorAddTopic,
      error: errorAddTopic,
      isSuccess: isSuccessAddTopic,
      isLoading: isLoadingAddTopic,
    },
  ] = useAddTopicToCategoryMutation();

  const [
    deleteByTopicIdMutation,
    { isError: isErrorOnDelete, error: errorOnDelete },
  ] = useDeleteByTopicIdMutation();

  useEffect(() => {
    if (isSuccessAddTopic) {
      setSelectedTopic("");
      setError(null);
    }
  }, [isSuccessAddTopic]);

  useEffect(() => {
    if (isErrorAddTopic) {
      let errMsg;
      if (errorAddTopic && errorAddTopic.data && errorAddTopic.data.message) {
        errMsg = errorAddTopic.data.message;
      } else {
        errMsg = "Something went wrong. Please try again later.";
      }

      setError(errMsg);
    }
  }, [isErrorAddTopic, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTopic.toString().trim()) {
      setError("Topic is required");
      return;
    }

    addTopicMutation({
      categoryId,
      topicId: selectedTopic,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    let errMsg;
    if (errorTopic && errorTopic.data && errorTopic.data.message) {
      errMsg = errorTopic.data.message;
    } else {
      errMsg = "Something went wrong. Please try again later.";
    }

    return <ErrorDisplay message={errMsg} />;
  }

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleDeleteByTopicId = (topicId) => {
    deleteByTopicIdMutation({
      categoryId: categoryId,
      topicId: topicId,
    });
  };

  return (
    <>
      <TopicsDropDownBySectionId
        handleChange={handleTopicChange}
        selectedTopic={selectedTopic}
        disable={false}
        sectionId={sectionId}
        topicsInCategory={topics}
      />
      {error && (
        <Typography sx={{ mt: 1 }} variant="subtitle2" color="error">
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        fullWidth
        startIcon={<AddIcon />}
        disabled={isLoadingAddTopic}
      >
        {isLoadingAddTopic ? "Adding..." : "Add Topic"}
      </Button>

      <Typography variant="h5" mt={3}>
        Topics
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {topics.map((topic) => (
          <ListItem
            key={topic.id}
            sx={{
              border: "1px solid grey",
              borderRadius: "5px",
              my: 2,
              cursor: "pointer",
            }}
          >
            <ListItemText primary={topic.title} />

            <IconButton
              sx={{ mr: 1 }}
              onClick={(event) => {
                handleDeleteByTopicId(topic.id);
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <AppSnackbar
        isOpen={isSuccessAddTopic}
        autoHideDuration={4000}
        severity={"success"}
        message={"Topic added."}
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

export default AddTopicToCategoryScreen;
