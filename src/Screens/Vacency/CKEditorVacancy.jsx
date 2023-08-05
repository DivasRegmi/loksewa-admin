import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useUpdateVacancyMutation } from "../../redux/vacancyAPISlice";
import AppSnackbar from "../../components/AppSnackbar";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const CKEditorVacancy = () => {
  const { vacancy } = useLocation().state;
  const [description, setDescription] = useState(vacancy.description);
  const [error, setError] = useState(null);

  const [
    updateVacancyMutation,
    { isError, error: vacancyError, isSuccess, isLoading },
  ] = useUpdateVacancyMutation();

  useEffect(() => {
    if (isError) {
      if (vacancyError && vacancyError.data) {
        setError(vacancyError.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateVacancyMutation({
      vacancyId: vacancy.id,
      body: { description },
    });
  };

  return (
    <div>
      <CKEditor
        editor={Editor}
        data={vacancy.description}
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

export default CKEditorVacancy;
