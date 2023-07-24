import { apiSlice } from "./apiSlice";

export const QuestionSolutionDescriptionAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionSolutionDescription: builder.query({
      query: (id) => `/api/question/${id}/description`,
      providesTags: ["QuestionSolutionDescription"],
    }),
    addQuestionSolutionDescription: builder.mutation({
      query: ({ questionId, formData }) => ({
        url: `/api/question/${questionId}/description`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["QuestionSolutionDescription"],
    }),
    updateQuestionSolutionDescription: builder.mutation({
      query: ({ questionId, formData }) => ({
        url: `/api/questionDescription/${questionId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["QuestionSolutionDescription"],
    }),
    deleteQuestionSolutionDescription: builder.mutation({
      query: (questionId) => ({
        url: `/api/questionDescription/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["QuestionSolutionDescription"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetQuestionSolutionDescriptionQuery,
  useAddQuestionSolutionDescriptionMutation,
  useUpdateQuestionSolutionDescriptionMutation,
  useDeleteQuestionSolutionDescriptionMutation,
} = QuestionSolutionDescriptionAPISlice;
