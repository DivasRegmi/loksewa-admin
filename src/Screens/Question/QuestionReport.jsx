import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";

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
import { useDeleteQuestionMutation } from "../../redux/QuestionsAPISlice";
import DisplayReportDescriptionAnduser from "./DisplayReportDescriptionAnduser";

const QuestionReport = () => {
  const [selectedQuestion, setSelectedQuestion] = useState({ id: -1 });
  const [selectedChoice, setSelectedChoice] = useState({ id: -1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [pageNo, setPageNo] = useState(0);

  const [questionIdToDelete, setQuestionIdToDelete] = useState(null);

  const [deleteQuestionConfirmationOpen, setDeleteQuestionConfirmationOpen] =
    useState(false);

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
    pageNo: pageNo,
    pageSize: 100,
  });

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

  const [
    deleteQuestion,
    { isError: isErrorOnDeleteQuestion, error: errorOnDeleteQuestion },
  ] = useDeleteQuestionMutation();

  const handleDeleteQuestion = (id) => {
    setQuestionIdToDelete(id);
    handleDeleteQuestionConfirmationOpen();
  };

  const handleDeleteQuestionConfirmationOpen = () => {
    setDeleteQuestionConfirmationOpen(true);
  };

  const handleDeleteQuestionConfirmationClose = () => {
    setDeleteQuestionConfirmationOpen(false);
  };

  const handleConfirmDeleteQuestion = () => {
    deleteQuestion(questionIdToDelete);
    setQuestionIdToDelete(null);
    handleDeleteQuestionConfirmationClose();
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
      <Typography variant="h5" sx={{ my: 2 }}>
        Reports
      </Typography>
      <Divider />

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
                    mt: 1,
                  }}
                >
                  {question.id + ") "}
                  {question.question}
                </Typography>
              )}
              {selectedQuestion.id === -1 && (
                <>
                  <Box sx={{ position: "absolute", top: 0, right: 8 }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEditQuestion(question);
                      }}
                    >
                      <EditSharpIcon />
                    </IconButton>

                    <IconButton
                      onClick={(e) => {
                        handleDeleteQuestion(question.id);
                      }}
                    >
                      <DeleteIcon color="#CE2029" />
                    </IconButton>
                  </Box>
                </>
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

              <Box sx={{display:"flex", flexDirection:"column"}}>
                <DisplayReportDescriptionAnduser
                  data={question.reportDescriptions}
                />
              </Box>

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

              <ConfirmationDialog
                title={"Confirm Delete"}
                description={"Are you sure you want to delete this question?"}
                open={deleteQuestionConfirmationOpen}
                handleClose={handleDeleteQuestionConfirmationClose}
                handleConfirm={handleConfirmDeleteQuestion}
              />

              <AppSnackbar
                isOpen={isErrorOnDelete}
                autoHideDuration={4000}
                severity={"error"}
                message={
                  errorOnDelete
                    ? errorOnDelete.data.message
                    : "Error on delete Report"
                }
              />

              <AppSnackbar
                isOpen={isErrorOnDeleteQuestion}
                autoHideDuration={4000}
                severity={"error"}
                message={
                  errorOnDeleteQuestion
                    ? errorOnDeleteQuestion.data.message
                    : "Error on delete Question"
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
