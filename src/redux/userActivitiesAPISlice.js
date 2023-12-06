import { apiSlice } from "./apiSlice";

export const userActivitiesAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dailyDownloadUsersLast30Days: builder.query({
      query: () => "/api/activity/daily-download-users-last-30-days",
    }),
    dailyDownloadUsersLast6Months: builder.query({
      query: () => "/api/activity/download-users-last-6-months",
    }),

   
  }),
  overrideExisting: true,
});

export const { useDailyDownloadUsersLast30DaysQuery, useDailyDownloadUsersLast6MonthsQuery } =
userActivitiesAPISlice;
