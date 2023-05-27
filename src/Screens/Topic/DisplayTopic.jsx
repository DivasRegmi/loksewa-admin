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
import { useGetTopicsQuery } from "../../redux/topicsAPISlice";
import EditTopic from "./EditTopic";
import { useNavigate } from "react-router-dom";
import RouteConfig from "../../config/RouteConfig";

const DisplayTopic = ({ sectionId }) => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState({ id: -1 });

  const toggleEditSection = (selectedTopic) => {
    setSelectedTopic(selectedTopic);
  };

  const onClickTopic = (topic) => {
    const data = { topic: topic };
    navigate(`/${RouteConfig.QUESTION_SCREEN}`, { state: data });
  };

  const {
    data: topics,
    isLoading,
    error,
    isError,
  } = useGetTopicsQuery(sectionId);

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
        Sections
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {topics.map((topic) =>
          selectedTopic.id === topic.id ? (
            <EditTopic
              key={topic.id}
              topic={topic}
              toggleEditTopic={toggleEditSection}
            />
          ) : (
            <ListItem
              key={topic.id}
              sx={{
                border: "1px solid grey",
                borderRadius: "5px",
                my: 2,
                cursor: "pointer",
              }}
              onClick={() => {
                onClickTopic(topic);
              }}
            >
              <ListItemText primary={topic.title} />

              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  toggleEditSection(topic);
                }}
              >
                <EditSharpIcon />
              </IconButton>
            </ListItem>
          )
        )}
      </List>
    </>
  );
};

export default DisplayTopic;
