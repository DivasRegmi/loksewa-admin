import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import React, { useState } from "react";
import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import RouteConfig from "../../config/RouteConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import AppSnackbar from "../../components/AppSnackbar";

import {
  useGetTopicDescriptionByTopicIdQuery,
  useDeleteByTopicDescriptionIdMutation,
} from "../../redux/topicDescriptionAPISlice";
import EditTopicDescription from "./EditTopicDescription";

const DisplayTopicDescription = ({ topicId }) => {
  const navigate = useNavigate();
  const [selectedTopicDescription, setSelectedTopicDescription] = useState({
    id: -1,
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [topicDescriptionIdToDelete, setTopicDescriptionIdToDelete] =
    useState(null);

  const toggleEditSection = (selectedTopicDescription) => {
    setSelectedTopicDescription(selectedTopicDescription);
  };

  const onClickTopic = (topicDescription) => {
    navigate(`/${RouteConfig.TOPIC_DESCRIPTION_CK_Editor_SCREEN}`, {
      state: { topicDescription },
    });
  };
  const [
    deleteTopicDescription,
    { isError: isErrorOnDelete, error: errorOnDelete },
  ] = useDeleteByTopicDescriptionIdMutation();

  const handleDeleteTopicDescription = (id) => {
    handleConfirmationOpen();
    setTopicDescriptionIdToDelete(id);
  };
  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };
  const handleConfirm = () => {
    deleteTopicDescription(topicDescriptionIdToDelete);
    handleConfirmationClose();
  };

  const {
    data: topicDescriptions,
    isLoading,
    error,
    isError,
  } = useGetTopicDescriptionByTopicIdQuery(topicId);

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
    <>
      <Typography variant="h5" mt={2}>
        Sections
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {topicDescriptions.map((topicDescription) =>
          selectedTopicDescription.id === topicDescription.id ? (
            <EditTopicDescription
              key={topicDescription.id}
              topicDescription={topicDescription}
              toggleEditTopic={toggleEditSection}
            />
          ) : (
            <ListItem
              key={topicDescription.id}
              sx={{
                border: "1px solid grey",
                borderRadius: "5px",
                my: 2,
                cursor: "pointer",
              }}
              onClick={() => {
                onClickTopic(topicDescription);
              }}
            >
              <ListItemText primary={topicDescription.title} />

              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  toggleEditSection(topicDescription);
                }}
              >
                <EditSharpIcon />
              </IconButton>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteTopicDescription(topicDescription.id);
                }}
              >
                <DeleteIcon color="red" />
              </IconButton>
            </ListItem>
          )
        )}
      </List>

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

export default DisplayTopicDescription;
