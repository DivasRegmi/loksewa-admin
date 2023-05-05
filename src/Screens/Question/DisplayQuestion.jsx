import React, { useState } from "react";
import { IconButton, List, ListItem, Typography, Box } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";

import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import EditQuestion from "./EditQuestion";

import { useGetQuestionsQuery } from "../../redux/QuestionsAPISlice";
import EditChoice from "./EditChoice";
import DisplayImage from "./DisplayImage";
import MyPagination from "../../components/MyPagination";

const DisplayQuestion = ({ topicId }) => {
  const [selectedQuestion, setSelectedQuestion] = useState({ id: -1 });
  const [selectedChoice, setSelectedChoice] = useState({ id: -1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pageNo, setPageNo] = useState(0);

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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorDisplay message={error.error} />;
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
                <Typography variant="subtitle1" sx={{ wordWrap: "break-word" }}>
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

export default DisplayQuestion;
