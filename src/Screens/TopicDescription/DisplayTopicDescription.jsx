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

import { useGetTopicDescriptionByTopicIdQuery } from "../../redux/topicDescriptionAPISlice";
import EditTopicDescription from "./EditTopicDescription";

const DisplayTopicDescription = ({ topicId }) => {
  const navigate = useNavigate();
  const [selectedTopicDescription, setSelectedTopicDescription] = useState({
    id: -1,
  });

  const toggleEditSection = (selectedTopicDescription) => {
    setSelectedTopicDescription(selectedTopicDescription);
  };

  const onClickTopic = (topicDescription) => {
    navigate(`/${RouteConfig.TOPIC_DESCRIPTION_CK_Editor_SCREEN}`, {
      state: { topicDescription },
    });
  };

  const {
    data: topicDescriptions,
    isLoading,
    error,
    isError,
  } = useGetTopicDescriptionByTopicIdQuery(topicId);

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
        {topicDescriptions.map((topicDescription) =>
          selectedTopicDescription.id === topicDescription.id ? (
            <EditTopicDescription
              key={topicDescription.id}
              topicDescription={topicDescription}
              toggleEditTopic={toggleEditSection}
            />
          ) : (
            <ListItem
              key={topicDescription.id}
              sx={{
                border: "1px solid grey",
                borderRadius: "5px",
                my: 2,
                cursor: "pointer",
              }}
              onClick={() => {
                onClickTopic(topicDescription);
              }}
            >
              <ListItemText primary={topicDescription.title} />

              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  toggleEditSection(topicDescription);
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

export default DisplayTopicDescription;
