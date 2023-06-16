import { apiSlice } from "./apiSlice";

export const topicDescriptionAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopicDescriptionByTopicId: builder.query({
      query: (topicId) => `/api/topic-description/topic/${topicId}`,
      providesTags: ["topicDescriptions"],
    }),
    addTopicDescription: builder.mutation({
      query: ({ topicId, body }) => ({
        url: `/api/topic-description/topic/${topicId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["topicDescriptions"],
    }),
    updateTopicDescription: builder.mutation({
      query: ({ topicDescriptionId, body }) => ({
        url: `/api/topic-description/${topicDescriptionId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["topicDescriptions"],
    }),
    deleteByTopicDescriptionId: builder.mutation({
      query: (topicDescriptionId) => ({
        url: `/api/topic-description/${topicDescriptionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["topicDescriptions"],
    }),
  }),
  overrideExisting: true,
});                 

export const {
 useGetTopicDescriptionByTopicIdQuery,
 useAddTopicDescriptionMutation,
 useUpdateTopicDescriptionMutation,
 useDeleteByTopicDescriptionIdMutation
} = topicDescriptionAPISlice;
