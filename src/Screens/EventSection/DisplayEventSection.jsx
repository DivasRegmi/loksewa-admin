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
import EditEventSection from "./EditEventSection";
import RouteConfig from "../../config/RouteConfig";
import {
  useDeleteEventSectionMutation,
  useGetEventSectionsQuery,
} from "../../redux/eventAPISlice";
import AppSnackbar from "../../components/AppSnackbar";
import ConfirmationDialog from "../../components/ConfirmationDialog";

const DisplayEventSection = () => {
  const navigate = useNavigate();
  const [selectedEventSection, setSelectedEventSection] = useState({ id: -1 });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);

  const [
    deleteEventSection,
    { isError: isErrorOnDelete, error: errorOnDelete },
  ] = useDeleteEventSectionMutation();

  const handleDeleteEventSection = (id) => {
    handleConfirmationOpen();
    setSectionIdToDelete(id);
  };

  const toggleEditEventSection = (selectedEventSection) => {
    setSelectedEventSection(selectedEventSection);
  };

  const onClickEventSection = (eventSection) => {
    const data = { eventSection: eventSection };
    navigate(`/${RouteConfig.EVENT_SCREEN}`, { state: data });
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };
  const handleConfirm = () => {
    deleteEventSection(sectionIdToDelete);
    setSectionIdToDelete(null);
    handleConfirmationClose();
  };

  const {
    data: eventSections,
    isLoading,
    error,
    isError,
  } = useGetEventSectionsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorDisplay message={error.error} />;
  }

  return (
    <>
      <Typography variant="h5" mt={2}>
        Event Sections
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {eventSections.map((eventSection) =>
          selectedEventSection.id === eventSection.id ? (
            <EditEventSection
              key={eventSection.id}
              eventSection={eventSection}
              toggleEditEventSection={toggleEditEventSection}
            />
          ) : (
            <ListItem
              key={eventSection.id}
              sx={{
                border: "1px solid grey",
                borderRadius: "5px",
                my: 2,
                cursor: "pointer",
              }}
              onClick={() => {
                onClickEventSection(eventSection);
              }}
            >
              <ListItemText primary={eventSection.title} />

              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  toggleEditEventSection(eventSection);
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
                  handleDeleteEventSection(eventSection.id);
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

export default DisplayEventSection;
