import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Button, List, Box, ListItem } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import {
  useAddQuestionsToExamBySectionIdMutation,
  useGetExamQuestionsByIdQuery,
} from "../../redux/ExamAPISlice";
import ExamModelSetSectionDropDown from "../../components/ExamModelSetSectionDropDown";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";
import MyPagination from "../../components/MyPagination";

const ExamDetails = () => {
  const { exam } = useLocation().state;
  const [selectedSection, setSelectedSection] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const [error, setError] = useState(null);

  const [
    addQuestionToExam,
    {
      isError: isErrorAddQuestion,
      error: addQuestionError,
      isSuccess: isSuccessAddQuestion,
      isLoading: isLoadingAddQuestion,
    },
  ] = useAddQuestionsToExamBySectionIdMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSection.toString().trim()) {
      setError("Section is required");
      return;
    }

    addQuestionToExam({
      examId: exam.id,
      examModelSetSectionId: selectedSection,
    });
  };

  const {
    data: questions,
    isLoading,
    error: questionsError,
    isError,
    refetch,
  } = useGetExamQuestionsByIdQuery({
    examId: exam.id,
    pageNo: pageNo,
    pageSize: 20,
  });

  useEffect(() => {
    if (isErrorAddQuestion) {
      if (addQuestionError && addQuestionError.data) {
        setError(addQuestionError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isErrorAddQuestion, addQuestionError]);

  useEffect(() => {
    if (isSuccessAddQuestion) {
      setSelectedSection("");
      setError(null);
      refetch();
    }
  }, [isSuccessAddQuestion, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    let errMsg;
    if (questionsError && questionsError.data && questionsError.data.message) {
      errMsg = questionsError.data.message;
    } else {
      errMsg = "Something went wrong. Please try again later.";
    }

    return <ErrorDisplay message={errMsg} />;
  }

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {exam.title}
      </Typography>

      <ExamModelSetSectionDropDown
        selectedSection={selectedSection}
        handleChange={handleSectionChange}
      />

      {error && (
        <Typography variant="subtitle2" color="error">
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 1 }}
        startIcon={<AddIcon />}
        disabled={isLoadingAddQuestion}
      >
        {isLoadingAddQuestion ? "Adding..." : "Add Questions"}
      </Button>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {questions.content.map((question) => (
          <ListItem
            key={question.id}
            sx={{ backgroundColor: "#dddddd", mb: 2, borderRadius: 2 }}
          >
            <Box sx={{ flexGrow: 1, maxWidth: "98%" }}>
              <Typography variant="subtitle1" sx={{ wordWrap: "break-word" }}>
                {question.question}
              </Typography>

              {question.image != null ? (
                <Box
                  p={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src={question.image}
                    alt="Question"
                    style={{
                      maxWidth: "350px",
                      height: 150,
                      borderRadius: 5,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </Box>
              ) : null}

              <Typography
                sx={{
                  p: 1,
                  my: 2,
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              >
                {question.rightChoice.choice}
              </Typography>
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
    </>
  );
};

export default ExamDetails;
