import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import themeReducer from "./themeSlice";
import resultReducer from "./resultSlice"
import testQuestionReducer from "./testQuestionSlice"
import testQuestionConfigReducer from "./testQuestionConfigSlice";
import { apiSlice } from "./apiSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["theme"],
};

const rootReducer = combineReducers({
  theme: themeReducer,
  result: resultReducer,
  testQuestions: testQuestionReducer,
  testQuestionsConfig: testQuestionConfigReducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default persistReducer(persistConfig, rootReducer);
