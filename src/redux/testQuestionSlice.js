import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionList: [],
};

export const testQuestionsSlice = createSlice({
  name: "testQuestions",
  initialState,
  reducers: {
    setTestQuestionList: (state, action) => {
      state.questionList = action.payload;
    },
    resetTestQuestionSlice: (state) => {
      return { ...initialState };
    },
  },
});

export const selectTestQuestionsList = (state) => {
  return state.testQuestions.questionList;
};

export const { setTestQuestionList, resetTestQuestionSlice } =
  testQuestionsSlice.actions;

export default testQuestionsSlice.reducer;
