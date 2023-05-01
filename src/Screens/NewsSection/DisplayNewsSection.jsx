import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";

import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import EditNewsSection from "./EditNewsSection";
import RouteConfig from "../../config/RouteConfig";
import {
  useDeleteNewsSectionMutation,
  useGetNewsSectionsQuery,
} from "../../redux/newsAPISlice";
import AppSnackbar from "../../components/AppSnackbar";
import ConfirmationDialog from "../../components/ConfirmationDialog";

const DisplayNewsSection = () => {
  const navigate = useNavigate();
  const [selectedNewsSection, setSelectedNewsSection] = useState({ id: -1 });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);

  const [
    deleteNewsSection,
    { isError: isErrorOnDelete, error: errorOnDelete },
  ] = useDeleteNewsSectionMutation();

  const handleDeleteNewsSection = (id) => {
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
    deleteNewsSection(sectionIdToDelete);
    handleConfirmationClose();
  };

  const toggleEditNewsSection = (selectedNewsSection) => {
    setSelectedNewsSection(selectedNewsSection);
  };

  const onClickNewsSection = (newsSection) => {
    const data = { newsSection: newsSection };
    navigate(`/${RouteConfig.NEWS_SCREEN}`, { state: data });
  };

  const {
    data: newsSections,
    isLoading,
    error,
    isError,
  } = useGetNewsSectionsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorDisplay message={error.error} />;
  }

  return (
    <>
      <Typography variant="h5" mt={2}>
        News Sections
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {newsSections.map((newsSection) =>
          selectedNewsSection.id === newsSection.id ? (
            <EditNewsSection
              key={newsSection.id}
              newsSection={newsSection}
              toggleEditNewsSection={toggleEditNewsSection}
            />
          ) : (
            <ListItem
              key={newsSection.id}
              sx={{
                border: "1px solid grey",
                borderRadius: "5px",
                my: 2,
                cursor: "pointer",
              }}
              onClick={() => {
                onClickNewsSection(newsSection);
              }}
            >
              <ListItemText primary={newsSection.title} />

              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  toggleEditNewsSection(newsSection);
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
                  handleDeleteNewsSection(newsSection.id);
                }}
              >
                <DeleteIcon color="error" />
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

export default DisplayNewsSection;
