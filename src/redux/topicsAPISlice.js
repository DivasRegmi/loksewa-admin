import { apiSlice } from "./apiSlice";

export const topicsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: (id) => `api/sections/${id}/topics`,
      providesTags: ["topics"],
    }),
    getTopicsBySectionIdAndCategoryId: builder.query({
      query: ({ categoryId, sectionId }) =>
        `api/topics/sections/${sectionId}/category/${categoryId}`,
      providesTags: ["SectionByTopicId"],
      invalidatesTags: ["SectionByTopicId"],
    }),
    getAllTopics: builder.query({
      query: (id) => `/api/topics`,
      providesTags: ["allTopics"],
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
  useGetAllTopicsQuery,
  useUpdateTopicMutation,
  useAddTopicMutation,
  useGetTopicsBySectionIdAndCategoryIdQuery,
} = topicsApiSlice;
