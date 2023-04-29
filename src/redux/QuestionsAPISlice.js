import { apiSlice } from "./apiSlice";

export const questionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (args) =>
        "/api/topics/" +
        args.id +
        "/questions?pageNo=" +
        args.pageNo +
        "&pageSize=" +
        args.pageSize +
        "&choices=" +
        args.choices,
      providesTags: ["Questions"],
    }),
    getRandomQuestions: builder.query({
      query: (args) =>
        "/api/topics/" +
        args.topicId +
        "/questions/random?totalQuestion=" +
        args.totalQuestion,
    }),
    getQuestionImage: builder.query({
      query: (id) => "/api/questions/" + id + "/images",
      providesTags: ["QuestionsImage"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetQuestionsQuery,
  useGetRandomQuestionsQuery,
  useGetQuestionImageQuery,
} = questionsApiSlice;
