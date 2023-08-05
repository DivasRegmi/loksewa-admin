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

import {
  useDeleteByIdMutation,
  useGetVacancyListQuery,
} from "../../redux/vacancyAPISlice";
import EditVacancy from "./EditVacancy";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import AppSnackbar from "../../components/AppSnackbar";

const DisplayVacancy = () => {
  const navigate = useNavigate();
  const [selectedVacancy, setSelectedVacancy] = useState({
    id: -1,
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [vacancyIdToDelete, setVacancyIdToDelete] = useState(null);
  const toggleEditVacancy = (selectedVacancy) => {
    setSelectedVacancy(selectedVacancy);
  };

  const [deleteVacancy, { isError: isErrorOnDelete, error: errorOnDelete }] =
    useDeleteByIdMutation();

  const onClickVacancy = (vacancy) => {
    navigate(`/${RouteConfig.VACENCY_CK_Editor_SCREEN}`, {
      state: { vacancy },
    });
  };

  const handleDeleteVacancy = (id) => {
    handleConfirmationOpen();
    setVacancyIdToDelete(id);
  };
  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };
  const handleConfirm = () => {
    deleteVacancy(vacancyIdToDelete);
    handleConfirmationClose();
  };

  const {
    data: vacancies,
    isLoading,
    error,
    isError,
  } = useGetVacancyListQuery();

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
        Vacancies
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {vacancies.map((vacancy) =>
          selectedVacancy.id === vacancy.id ? (
            <EditVacancy
              key={vacancy.id}
              vacancy={vacancy}
              toggleEditVacancy={toggleEditVacancy}
            />
          ) : (
            <ListItem
              key={vacancy.id}
              sx={{
                border: "1px solid grey",
                borderRadius: "5px",
                my: 2,
                cursor: "pointer",
              }}
              onClick={() => {
                onClickVacancy(vacancy);
              }}
            >
              <ListItemText primary={vacancy.title} />

              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  toggleEditVacancy(vacancy);
                }}
              >
                <EditSharpIcon />
              </IconButton>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteVacancy(vacancy.id);
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

export default DisplayVacancy;
