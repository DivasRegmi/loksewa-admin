import { apiSlice } from "./apiSlice";

export const topicsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: (id) => "api/sections/" + id + "/topics",
      providesTags: ["topics"],
    }),
  }),
  overrideExisting: true,
 
});

export const { useGetTopicsQuery } = topicsApiSlice;
