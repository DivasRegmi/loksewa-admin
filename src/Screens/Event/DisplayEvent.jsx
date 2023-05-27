import React, { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";

import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import EditEvent from "./EditEvent";
import {
  useDeleteEventMutation,
  useGetEventBySectionIdQuery,
} from "../../redux/eventAPISlice";
import AppSnackbar from "../../components/AppSnackbar";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import DateTypeToggle from "../../components/DateTypeToggle";
import MyPagination from "../../components/MyPagination";

const DisplayEvent = ({ eventSectionId }) => {
  const [selectedEvent, setSelectedEvent] = useState({ id: -1 });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [dateType, setDateType] = useState("AD");
  const [pageNo, setPageNo] = useState(0);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [deleteEvent, { isError: isErrorOnDelete, error: errorOnDelete }] =
    useDeleteEventMutation();

  const handleDeleteEvent = (id) => {
    handleConfirmationOpen();
    setSectionIdToDelete(id);
  };

  const toggleEditEvent = (selectedEvent) => {
    setSelectedEvent(selectedEvent);
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleConfirm = () => {
    deleteEvent(sectionIdToDelete);
    setSectionIdToDelete(null);
    handleConfirmationClose();
  };

  const {
    data: events,
    isLoading,
    error,
    isError,
  } = useGetEventBySectionIdQuery({
    type: dateType,
    sectionId: eventSectionId,
    pageNo: pageNo,
    pageSize: 50,
    day: day || false,
    month: month || false,
    year: year || false,
  });

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography variant="h5" mt={2}>
          Event
        </Typography>
        <Box>
          <DateTypeToggle dateType={dateType} setDateType={setDateType} />
          <IconButton
            sx={{
              ml: 1,
            }}
            onClick={() => {
              setIsSearchVisible((prevData) => !prevData);
              setDay("");
              setMonth("");
              setYear("");
            }}
          >
            {isSearchVisible ? (
              <ArrowDropUpSharpIcon />
            ) : (
              <ArrowDropDownSharpIcon />
            )}
          </IconButton>
        </Box>
      </Box>

      {isSearchVisible ? (
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
        </Box>
      ) : null}

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {events.content.map((event) =>
          selectedEvent.id === event.id ? (
            <EditEvent
              key={event.id}
              event={event}
              toggleEditEvent={toggleEditEvent}
            />
          ) : (
            <ListItem
              key={event.id}
              sx={{
                border: "1px solid grey",
                borderRadius: "5px",
                my: 2,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">{event.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {event.year ? event.year + " year - " : null}
                  {event.month ? event.month + " month - " : null}
                  {event.day ? event.day + " day " : null}
                </Typography>
              </Box>
              <IconButton
                sx={{ ml: 5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEditEvent(event);
                }}
              >
                <EditSharpIcon />
              </IconButton>

              <IconButton
                sx={{
                  ml: 1,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEvent(event.id);
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
          totalPages={events.paginationResponse.totalPages}
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

export default DisplayEvent;
