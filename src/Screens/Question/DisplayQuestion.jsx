import React, { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";

import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import EditQuestion from "./EditQuestion";

import {
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
} from "../../redux/QuestionsAPISlice";
import EditChoice from "./EditChoice";
import DisplayImage from "./DisplayImage";
import MyPagination from "../../components/MyPagination";
import DisplayQuestionSolution from "./DisplayQuestionSolution";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import AppSnackbar from "../../components/AppSnackbar";

const DisplayQuestion = ({ topicId }) => {
  const [selectedQuestion, setSelectedQuestion] = useState({ id: -1 });
  const [selectedChoice, setSelectedChoice] = useState({ id: -1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pageNo, setPageNo] = useState(0);

  const [questionIdToDelete, setQuestionIdToDelete] = useState(null);

  const [deleteQuestionConfirmationOpen, setDeleteQuestionConfirmationOpen] =
    useState(false);

  const toggleEditQuestion = (selectedQuestion) => {
    setSelectedQuestion(selectedQuestion);
  };
  const toggleEditChoice = (selectedChoice) => {
    setSelectedChoice(selectedChoice);
    refetch();
  };

  const {
    data: questions,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetQuestionsQuery({
    topicId: topicId,
    pageNo: pageNo,
    pageSize: 20,
    choices: true,
  });

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

  if (isError ) {
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
          Question
        </Typography>
      </Box>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {questions.content.map((question) => (
          <ListItem
            key={question.id}
            sx={{ backgroundColor: "#dddddd", mb: 2, borderRadius: 2 }}
          >
            <Box sx={{ flexGrow: 1, maxWidth: "98%" }}>
              {selectedQuestion.id === question.id ? (
                <EditQuestion
                  key={question.id}
                  questionItem={question}
                  toggleEditQuestion={toggleEditQuestion}
                />
              ) : (
                <Typography
                  variant="subtitle1"
                  sx={{ wordWrap: "break-word", mr: 2 }}
                >
                  {question.id + ") "}
                  {question.question}
                </Typography>
              )}
              {selectedQuestion.id === -1 && (
                <Box sx={{ position: "absolute", top: 0, right: 8 }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEditQuestion(question);
                    }}
                  >
                    <EditSharpIcon color="#0099ff" />
                  </IconButton>

                  <IconButton
                    onClick={(e) => {
                      handleDeleteQuestion(question.id);
                    }}
                  >
                    <DeleteIcon color="#CE2029" />
                  </IconButton>
                </Box>
              )}

              <DisplayImage
                src={question.image}
                questionId={question.id}
                onSuccuss={() => refetch()}
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
              <Divider />

              <DisplayQuestionSolution
                questionSolution={question.questionSolutionDescription}
                questionId={question.id}
                onSuccuss={() => refetch()}
              />
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mb: 2 }}>
        <MyPagination
          pageNo={pageNo}
          totalPages={questions.paginationResponse.totalPages}
          onChangePage={(value) => setPageNo(value)}
        />
      </Box>

      <ConfirmationDialog
        title={"Confirm Delete"}
        description={"Are you sure you want to delete question?"}
        open={deleteQuestionConfirmationOpen}
        handleClose={handleDeleteQuestionConfirmationClose}
        handleConfirm={handleConfirmDeleteQuestion}
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
    </>
  );
};

export default DisplayQuestion;
