import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useUpdateTopicDescriptionMutation } from "../../redux/topicDescriptionAPISlice";
import AppSnackbar from "../../components/AppSnackbar";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const CKEditorTopicDescription = () => {
  const { topicDescription } = useLocation().state;
  const [description, setDescription] = useState(topicDescription.description);
  const [error, setError] = useState(null);

  const [
    updateTopicMutation,
    { isError, error: topicError, isSuccess, isLoading },
  ] = useUpdateTopicDescriptionMutation();

  useEffect(() => {
    if (isError) {
      if (topicError && topicError.data) {
        setError(topicError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTopicMutation({
      topicDescriptionId: topicDescription.id,
      body: { description },
    });
  };

  return (
    <div>
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={Editor}
        data={topicDescription.description}
        onChange={(event, editor) => {
          const data = editor.getData();
          setDescription(data);
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 4 }}
        disabled={isLoading}
        startIcon={<AddIcon />}
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>

      <AppSnackbar
        isOpen={isError}
        autoHideDuration={4000}
        severity={"error"}
        message={error || "Error on update"}
      />

      <AppSnackbar
        isOpen={isSuccess}
        autoHideDuration={4000}
        severity={"success"}
        message={"Successfully update."}
      />
    </div>
  );
};

export default CKEditorTopicDescription;
