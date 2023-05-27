import { apiSlice } from "./apiSlice";

export const examModelSetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExamModelSetSections: builder.query({
      query: () => "/api/exam-model-set-section",
      providesTags: ["ExamModelSetSection"],
    }),
    addExamModelSetSection: builder.mutation({
      query: (body) => ({
        url: `/api/exam-model-set-section`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ExamModelSetSection"],
    }),
    updateExamModelSetSection: builder.mutation({
      query: ({ examModelSetSectionId, body }) => ({
        url: `/api/exam-model-set-section/${examModelSetSectionId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["ExamModelSetSection"],
    }),
    deleteExamModelSetSection: builder.mutation({
      query: (examModelSetSectionId) => ({
        url: `/api/exam-model-set-section/${examModelSetSectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExamModelSetSection"],
    }),

    getExamModelSetsBySectionId: builder.query({
      query: (examModelSetSectionId) => {
        let url = `/api/exam-model-sets/exam-model-set-section/${examModelSetSectionId}`;
        return url;
      },
      method: "GET",
      providesTags: ["ExamModelSet"],
    }),
    addExamModelSet: builder.mutation({
      query: ({ examModelSetSectionId, body }) => ({
        url: `/api/exam-model-sets/exam-model-set-section/${examModelSetSectionId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ExamModelSet"],
    }),
    updateExamModelSet: builder.mutation({
      query: ({ examModelSetId, body }) => ({
        url: `/api/exam-model-sets/${examModelSetId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["ExamModelSet"],
    }),
    deleteExamModelSet: builder.mutation({
      query: (examModelSetId) => ({
        url: `/api/exam-model-sets/${examModelSetId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExamModelSet"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetExamModelSetSectionsQuery,
  useAddExamModelSetSectionMutation,
  useUpdateExamModelSetSectionMutation,
  useDeleteExamModelSetSectionMutation,

  useGetExamModelSetsBySectionIdQuery,
  useAddExamModelSetMutation,
  useUpdateExamModelSetMutation,
  useDeleteExamModelSetMutation,

} = examModelSetApiSlice;
