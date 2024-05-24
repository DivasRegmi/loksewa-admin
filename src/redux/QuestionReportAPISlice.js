import { apiSlice } from "./apiSlice";

export const questionsReportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionsReport: builder.query({
      query: (args) =>
        "/api/questionReport" +
        "?pageNo=" +
        args.pageNo +
        "&pageSize=" +
        args.pageSize,
      providesTags: ["Questions"],
    }),

    deleteQuestionReport: builder.mutation({
      query: (questionId) => ({
        url: `/api/questionReport/questions/${questionId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetQuestionsReportQuery, useDeleteQuestionReportMutation } =
  questionsReportApiSlice;
