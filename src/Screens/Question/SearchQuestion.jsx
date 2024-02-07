import React, { useEffect, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";

import ErrorDisplay from "../../components/ErrorDisplay";
import Loading from "../../components/Loading";
import EditQuestion from "./EditQuestion";

import {
  useLazySearchQuestionsQuery,
  useLazySearchQuestionsV3Query,
} from "../../redux/QuestionsAPISlice";
import EditChoice from "./EditChoice";
import DisplayImage from "./DisplayImage";
import MyPagination from "../../components/MyPagination";
import DisplayQuestionSolution from "./DisplayQuestionSolution";

const SearchQuestion = () => {
  const [questions, setQuestions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState({ id: -1 });
  const [selectedChoice, setSelectedChoice] = useState({ id: -1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pageNo, setPageNo] = useState(0);

  const toggleEditQuestion = (selectedQuestion) => {
    setSelectedQuestion(selectedQuestion);
  };
  const toggleEditChoice = (selectedChoice) => {
    setSelectedChoice(selectedChoice);
  };

  const [searchQuestion, { isError, error, isLoading }] =
    useLazySearchQuestionsV3Query();

  useEffect(() => {
    onPressSearch();
  }, [pageNo]);

  const onPressSearch = () => {
    searchQuestion({ searchTerm, pageNo, pageSize: 10 })
      .then((res) => {
        console.log(res);
        if (res) {
          setQuestions(res);
        }
      })
      .catch((error) => {});
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
        Question
      </Typography>
      <TextField
        sx={{ mt: 2 }}
        id="search"
        name="search"
        label="search"
        fullWidth
        margin="normal"
        value={searchTerm}
        multiline
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={onPressSearch}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {questions?.data?.content.map((question) => (
          <ListItem
            key={question.id}
            sx={{ backgroundColor: "#dddddd", mb: 2, borderRadius: 2 }}
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
                  onSuccuss={onPressSearch}
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
                onSuccuss={onPressSearch}
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
                      onSuccuss={onPressSearch}
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
                onSuccuss={() => onPressSearch()}
              />
            </Box>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mb: 2 }}>
        <MyPagination
          pageNo={pageNo}
          totalPages={questions?.data?.paginationResponse.totalPages}
          onChangePage={(value) => setPageNo(value)}
        />
      </Box>
    </>
  );
};

export default SearchQuestion;
