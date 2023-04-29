import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuestion: 1,
  questionAttemptedList: [],
};

export const testQuestionsConfigSlice = createSlice({
  name: "testQuestionsConfig",
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    changeToNextQuestion: (state) => {
      state.currentQuestion = state.currentQuestion + 1;
    },
    changeToPreviousQuestion: (state) => {
      state.currentQuestion = state.currentQuestion - 1;
    },
    addQuestionAttempt: (state, action) => {
      if (!state.questionAttemptedList.includes(action.payload)) {
        state.questionAttemptedList = [
          ...state.questionAttemptedList,
          action.payload,
        ];
      }
    },
    resetTestQuestionsConfig: (state) => {
      return { ...initialState };
    },
  },
});

export const selectCurrentQuestion = (state) =>
  state.testQuestionsConfig.currentQuestion;

export const selectQuestionAttemptedList = (state) => {
  return state.testQuestionsConfig.questionAttemptedList;
};

export const {
  setCurrentQuestion,
  changeToNextQuestion,
  changeToPreviousQuestion,
  addQuestionAttempt,
  resetTestQuestionsConfig,
} = testQuestionsConfigSlice.actions;

export default testQuestionsConfigSlice.reducer;
