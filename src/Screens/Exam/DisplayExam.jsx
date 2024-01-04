import React, { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import EditExam from "./EditExam";
import {
  useDeleteExamByIdMutation,
  useGetExamListByDateQuery,
} from "../../redux/ExamAPISlice";
import { useNavigate } from "react-router-dom";
import RouteConfig from "../../config/RouteConfig";
import AppSnackbar from "../../components/AppSnackbar";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import MyPagination from "../../components/MyPagination";

const weekBeforeDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
const yearAfterDate = new Date(
  new Date().getFullYear() + 100,
  new Date().getMonth(),
  new Date().getDate()
);

const DisplayExam = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState({ id: -1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [pageNo, setPageNo] = useState(0);

  const [fromDate, setFromDate] = useState(
    format(weekBeforeDate, "yyyy-MM-dd")
  );
  const [toDate, setToDate] = useState(format(yearAfterDate, "yyyy-MM-dd"));

  const [deleteExam, { isError: isErrorOnDelete, error: errorOnDelete }] =
    useDeleteExamByIdMutation();

  const handleDeleteExam = (id) => {
    setSectionIdToDelete(id);
    handleConfirmationOpen();
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };
  const handleConfirm = () => {
    deleteExam(sectionIdToDelete);
    handleConfirmationClose();
  };

  const toggleEditSection = (selectedExam) => {
    setSelectedExam(selectedExam);
  };

  const {
    data: exams,
    isLoading,
    error,
    isError,
  } = useGetExamListByDateQuery({
    from: `${fromDate}T00:00:00`,
    to: `${toDate}T00:00:00`,
    pageNo: pageNo,
    pageSize: 20,
  });

  const onClickExamItem = (exam) => {
    const data = { exam: exam };
    navigate(`/${RouteConfig.EXAM_DETAILS}`, { state: data });
  };

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
        Exams
      </Typography>

      <Box sx={{ display: "flex" }}>
        <TextField
          key={fromDate}
          id="date"
          name="date"
          label="From"
          type="date"
          fullWidth
          margin="normal"
          value={fromDate}
          onChange={(e) => {
            setFromDate(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          key={toDate}
          id="date"
          name="date"
          label="To"
          type="date"
          fullWidth
          margin="normal"
          value={toDate}
          onChange={(e) => {
            setToDate(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {exams.content.map((exam, index) =>
          selectedExam.id === exam.id ? (
            <EditExam
              key={exam.id}
              exam={exam}
              toggleEditExam={toggleEditSection}
            />
          ) : (
            <ListItem
              key={exam.id}
              sx={{
                border: "1px solid grey",
                borderRadius: "5px",
                my: 2,
                cursor: "pointer",
              }}
              onClick={() => {
                onClickExamItem(exam);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ListItemText
                primary={exam.title}
                secondary={`Date: ${exam.examDate.slice(0, 10)} Questions: ${
                  exam.totalQuestion
                } `}
              />

              {hoveredIndex === index && (
                <>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleEditSection(exam);
                    }}
                  >
                    <EditSharpIcon />
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteExam(exam.id);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </>
              )}
            </ListItem>
          )
        )}
      </List>
      <AppSnackbar
        isOpen={isErrorOnDelete}
        autoHideDuration={4000}
        severity={"error"}
        message={errorOnDelete ? errorOnDelete.data.message : "Error on delete"}
      />
      <ConfirmationDialog
        title={"Confirm Delete"}
        description={"Are you sure you want to delete this item?"}
        open={confirmationOpen}
        handleClose={handleConfirmationClose}
        handleConfirm={handleConfirm}
      />
      <Box sx={{ mb: 2 }}>
        <MyPagination
          pageNo={pageNo}
          totalPages={exams.paginationResponse.totalPages}
          onChangePage={(value) => setPageNo(value)}
        />
      </Box>
    </>
  );
};

export default DisplayExam;
