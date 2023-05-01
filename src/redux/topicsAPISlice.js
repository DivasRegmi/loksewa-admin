import { apiSlice } from "./apiSlice";

export const topicsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: (id) => `api/sections/${id}/topics`,
      providesTags: ["topics"],
    }),
    addTopic: builder.mutation({
      query: ({ sectionId, title }) => ({
        url: `/api/sections/${sectionId}/topics`,
        method: "POST",
        body: { title: title },
      }),
      invalidatesTags: ["topics"],
    }),
    updateTopic: builder.mutation({
      query: ({ topicId, title }) => ({
        url: `/api/topics/${topicId}`,
        method: "PATCH",
        body: { title: title },
      }),
      invalidatesTags: ["topics"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTopicsQuery,
  useUpdateTopicMutation,
  useAddTopicMutation,
} = topicsApiSlice;
