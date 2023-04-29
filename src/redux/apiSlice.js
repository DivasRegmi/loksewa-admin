import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "../config/config.json";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({ baseUrl: config.BASE_URL }),
  tagTypes: [
    "Banners",
    "Courses",
    "topics",
    "Questions",
    "TodayExam",
    "ExamDetails",
    "Exam",
    "ExamResult",
    "News",
    "NewsSection",
    "NewsByWeek",
    "Events",
    "EventsSection",
    "EventsBySearch",
  ],
  endpoints: (builder) => ({}),
});
