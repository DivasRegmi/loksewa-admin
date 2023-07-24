import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./userSlice";

import config from "../config/config.json";

const baseQuery = fetchBaseQuery({
  baseUrl: config.BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    api.dispatch(logout());
    return { error: { status: 403, data: null } };
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Banners",
    "Images",
    "Images-tag",
    "Sections",
    "topics",
    "topicDescriptions",
    "allTopics",

    "Questions",
    "QuestionsBySearch",
    "QuestionSolutionDescription",


    "ExamDetails",
    "Exam",
    "News",
    "NewsSection",
    "Events",
    "EventsSection",
    "EventsBySearch",

    "ExamModelSetSection",
    "ExamModelSet",

    "payment",
    "paymentDetails",

    "user",
    "SectionByCategorieId",
    "SectionByTopicId",
    "Category",
  ],
  endpoints: (builder) => ({}),
});
