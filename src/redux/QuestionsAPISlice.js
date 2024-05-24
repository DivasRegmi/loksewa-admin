import { apiSlice } from "./apiSlice";

export const questionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionById: builder.query({
      query: (questionId) => `/api/questions/${questionId}`,
    }),
    getQuestions: builder.query({
      query: (args) =>
        "/api/v2/topics/" +
        args.topicId +
        "/questions?pageNo=" +
        args.pageNo +
        "&pageSize=" +
        args.pageSize +
        "&choices=" +
        args.choices,
      providesTags: ["Questions"],
    }),
    searchQuestions: builder.query({
      query: (searchTerm) => "/api/questions/search?searchTerm=" + searchTerm,
      providesTags: ["QuestionsBySearch"],
    }),
    searchQuestionsV3: builder.query({
      query: ({ searchTerm, pageNo = 0, pageSize = 10 }) =>
        `/api/v3/questions/search?searchTerm=${searchTerm}&pageNo=${pageNo}&pageSize=${pageSize}`,
      providesTags: ["QuestionsBySearch"],
    }),

    addQuestion: builder.mutation({
      query: ({ topicId, body }) => ({
        url: `/api/topics/${topicId}/questions`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Questions"],
    }),
    updateQuestion: builder.mutation({
      query: ({ questionId, body }) => ({
        url: `/api/questions/${questionId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Questions"],
    }),
    updateChoice: builder.mutation({
      query: ({ choiceId, body }) => ({
        url: `api/questions/choices/${choiceId}`,
        method: "PATCH",
        body: body,
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (questionId) => ({
        url: `/api/questions/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Questions"],
    }),

    getQuestionImage: builder.query({
      query: (id) => "/api/questions/" + id + "/images",
      providesTags: ["QuestionsImage"],
    }),
    addQuestionImage: builder.mutation({
      query: ({ questionId, formData }) => ({
        url: `/api/questions/${questionId}/images`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["QuestionsImage"],
    }),
    updateQuestionImage: builder.mutation({
      query: ({ questionId, formData }) => ({
        url: `/api/questions/${questionId}/images`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["QuestionsImage"],
    }),
    deleteQuestionImage: builder.mutation({
      query: (questionId) => ({
        url: `/api/questions/${questionId}/images`,
        method: "DELETE",
      }),
      invalidatesTags: ["QuestionsImage"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetQuestionByIdQuery,
  useGetQuestionsQuery,
  useLazySearchQuestionsQuery,
  useLazySearchQuestionsV3Query,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useUpdateChoiceMutation,
  useDeleteQuestionMutation,

  useGetQuestionImageQuery,
  useAddQuestionImageMutation,
  useUpdateQuestionImageMutation,
  useDeleteQuestionImageMutation,
} = questionsApiSlice;
