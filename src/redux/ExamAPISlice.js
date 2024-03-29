import { apiSlice } from "./apiSlice";

export const examApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExamListByDate: builder.query({
      query: (args) =>
        "/api/exams?from=" +
        args.from +
        "&to=" +
        args.to +
        "&pageNo=" +
        args.pageNo +
        "&pageSize=" +
        args.pageSize,
      providesTags: ["Exams"],
    }),
    getExamQuestionsById: builder.query({
      query: ({ examId, pageNo, pageSize }) =>
        `/api/exams/${examId}/questions?pageNo=${pageNo}&pageSize=${pageSize}`,
      providesTags: ["ExamDetails"],
    }),
    addExam: builder.mutation({
      query: ({ categoryId, body }) => ({
        url: `/api/exams/category/${categoryId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Exams"],
    }),
    updateExam: builder.mutation({
      query: ({ examId, body }) => ({
        url: `/api/exams/${examId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Exams"],
    }),
    addQuestionsToExamByQuestionId: builder.mutation({
      query: ({ examId, questionId }) => ({
        url: `/api/exams/${examId}/questions/${questionId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Exams"],
    }),
    addQuestionsToExamBySectionId: builder.mutation({
      query: ({ examId, examModelSetSectionId }) => ({
        url: `/api/exams/${examId}/exam-model-set-section/${examModelSetSectionId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Exams"],
    }),

    deleteExamById: builder.mutation({
      query: (examId) => ({
        url: `/api/exams/${examId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exams"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetExamQuestionsByIdQuery,
  useGetExamListByDateQuery,

  useAddExamMutation,
  useUpdateExamMutation,
  useAddQuestionsToExamByQuestionIdMutation,
  useAddQuestionsToExamBySectionIdMutation,

  useDeleteExamByIdMutation,
} = examApiSlice;
