import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalQuestion: null,
  unattempted: null,
  correctAnswer: null,
  wrongAnswer: null,
  averageAccuracy: null,
  showLeaderBoard: true,
  examId: null,
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setResult: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetResultSlice: (state) => {
      return { ...initialState };
    },
  },
});

export const selectResult = (state) => {
  return state.result;
};

export const { setResult, resetResultSlice } = resultSlice.actions;

export default resultSlice.reducer;
