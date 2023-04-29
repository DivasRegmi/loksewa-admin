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
        (args.pageNo || 0) +
        "&pageSize=" +
        (args.pageSize || 10),
      providesTags: ["TodayExam"],
    }),
    getExamById: builder.query({
      query: (id) => "/api/exams/" + id,
      providesTags: ["ExamDetails"],
    }),
    getStudentResultByExamIdAndUserId: builder.query({
      query: (args) => "api/studentResults/users/" + args.userId + "/exams/" + args.examId,
      providesTags: ["ExamResult"],
    }),
    addExamResultToUser: builder.mutation({
      query: (args) => ({
        url:
          "/api/studentResults/users/" + args.userId + "/exams/" + args.examId,
        method: "POST",
        body: args.body,
      }),
      invalidatesTags: ["Exam"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetExamListByDateQuery,
  useGetExamByIdQuery,
  useAddExamResultToUserMutation,
  useLazyGetStudentResultByExamIdAndUserIdQuery,
  useGetStudentResultByExamIdAndUserIdQuery
} = examApiSlice;
