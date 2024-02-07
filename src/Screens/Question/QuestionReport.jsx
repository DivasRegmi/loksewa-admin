import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";

import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import EditQuestion from "./EditQuestion";
import DisplayImage from "./DisplayImage";
import EditChoice from "./EditChoice";

import {
  useDeleteQuestionReportMutation,
  useGetQuestionsReportQuery,
} from "../../redux/QuestionReportAPISlice";
import AppSnackbar from "../../components/AppSnackbar";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import MyPagination from "../../components/MyPagination";
import DisplayQuestionSolution from "./DisplayQuestionSolution";

const reportOptions = [
  "QUESTION_NOT_UPDATED",
  "QUESTION_PRINT_MISTAKE",
  "WRONG_CHOICES",
];

const QuestionReport = () => {
  const [selectedReport, setSelectedReport] = useState(reportOptions[0]);
  const [selectedQuestion, setSelectedQuestion] = useState({ id: -1 });
  const [selectedChoice, setSelectedChoice] = useState({ id: -1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [pageNo, setPageNo] = useState(0);

  const toggleEditQuestion = (selectedQuestion) => {
    setSelectedQuestion(selectedQuestion);
    refetch();
  };
  const toggleEditChoice = (selectedChoice) => {
    setSelectedChoice(selectedChoice);
    refetch();
  };

  const {
    data: reports,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetQuestionsReportQuery({
    report: selectedReport,
    pageNo: pageNo,
    pageSize: 10,
  });

  const handleReportChange = (event) => {
    setSelectedReport(event.target.value);
    refetch();
  };

  const [
    deleteQuestionReportMutation,
    {
      isError: isErrorOnDelete,
      error: errorOnDelete,
      isSuccess: isSuccessDelete,
    },
  ] = useDeleteQuestionReportMutation();

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleConfirm = () => {
    deleteQuestionReportMutation(sectionIdToDelete);
    setSectionIdToDelete(null);
    handleConfirmationClose();
  };

  useEffect(() => {
    if (isSuccessDelete) {
      refetch();
    }
  }, [isSuccessDelete, refetch]);

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
      <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
        <InputLabel id="report-select-label">Select report type</InputLabel>
        <Select
          labelId="report-select-label"
          id="report-select"
          value={selectedReport}
          onChange={handleReportChange}
          label="Select report type"
        >
          {reportOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" sx={{ my: 2 }}>
        Reports
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {reports.content.map((question) => (
          <ListItem
            key={question.id}
            sx={{
              backgroundColor: "#dddddd",
              mb: 2,
              borderRadius: 2,
            }}
          >
            <Box sx={{ flexGrow: 1, maxWidth: "98%" }}>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "inline-block",
                    px: 0.5,
                    py: 0.5,
                    mb: 0.5,
                    mr: 0.5,
                    borderRadius: 2,
                    backgroundColor: "#D45477",
                    color: "#fff",
                  }}
                >
                  {question.section.title}
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "inline-block",
                    px: 0.5,
                    py: 0.5,

                    borderRadius: 2,
                    backgroundColor: "#0099ff",
                    color: "#fff",
                  }}
                >
                  {question.topic.title}
                </Typography>
              </Box>

              {selectedQuestion.id === question.id ? (
                <EditQuestion
                  key={question.id}
                  questionItem={question}
                  toggleEditQuestion={toggleEditQuestion}
                />
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    wordWrap: "break-word",
                    textAlign: "justify",
                    mt:1

                  }}
                >
                  {question.question}
                </Typography>
              )}
              {selectedQuestion.id === -1 && (
                <IconButton
                  sx={{ position: "absolute", top: 0, right: 8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEditQuestion(question);
                  }}
                >
                  <EditSharpIcon />
                </IconButton>
              )}

              <DisplayImage
                src={question.image}
                questionId={question.id}
                onSuccuss={refetch}
              />

              <Box
                sx={{
                  my: 2,
                }}
              >
                {question.choices.map(({ choice, id }) =>
                  selectedChoice.id === id ? (
                    <EditChoice
                      key={`key-${id}`}
                      choiceItem={{ choice, id }}
                      toggleEditChoice={toggleEditChoice}
                    />
                  ) : (
                    <Box
                      position="relative"
                      key={`key-${id}`}
                      onMouseEnter={() => setHoveredIndex(id)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Typography
                        sx={{
                          p: 1,
                          my: 2,
                          border: "1px solid grey",
                          borderRadius: "5px",
                          backgroundColor:
                            id === question.rightChoice.id
                              ? "#99f994"
                              : "background",
                        }}
                      >
                        {choice}
                      </Typography>

                      {hoveredIndex === id && (
                        <IconButton
                          sx={{ position: "absolute", top: 0, right: 8 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEditChoice({ choice, id });
                          }}
                        >
                          <EditSharpIcon />
                        </IconButton>
                      )}
                    </Box>
                  )
                )}
              </Box>

              <DisplayQuestionSolution
                questionSolution={question.questionSolutionDescription}
                questionId={question.id}
                onSuccuss={() => refetch()}
              />

              <br />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: "#DC143C",
                    color: "#fff",
                  }}
                >
                  Report: {question.reportCount}
                </Typography>

                <Button
                  sx={{ ml: "auto" }}
                  variant="contained"
                  onClick={() => {
                    handleConfirmationOpen();
                    setSectionIdToDelete(question.id);
                  }}
                >
                  Solved
                </Button>
              </Box>

              <ConfirmationDialog
                title={"Confirm Solved"}
                description={"Are you sure you want to delete this report?"}
                open={confirmationOpen}
                handleClose={handleConfirmationClose}
                handleConfirm={handleConfirm}
              />
              <AppSnackbar
                isOpen={isErrorOnDelete}
                autoHideDuration={4000}
                severity={"error"}
                message={
                  errorOnDelete ? errorOnDelete.data.message : "Error on delete"
                }
              />
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mb: 2 }}>
        <MyPagination
          pageNo={pageNo}
          totalPages={reports.paginationResponse.totalPages}
          onChangePage={(value) => setPageNo(value)}
        />
      </Box>
    </>
  );
};

export default QuestionReport;
