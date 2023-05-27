import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "./userSlice";
import { apiSlice } from "./apiSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default persistReducer(persistConfig, rootReducer);
