import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/api/category",
      providesTags: ["Category"],
      invalidatesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/api/category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/category/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    addSectionToCategory: builder.mutation({
      query: ({ categoryId, sectionId }) => ({
        url: `/api/category/${categoryId}/sections/${sectionId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["SectionByCategorieId"],
    }),
    addTopicToCategory: builder.mutation({
      query: ({ categoryId, topicId }) => ({
        url: `/api/category/${categoryId}/topic/${topicId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["SectionByTopicId"],
    }),
    deleteBySectionId: builder.mutation({
      query: ({ categoryId, sectionId }) => ({
        url: `/api/category/${categoryId}/sections/${sectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SectionByCategorieId"],
    }),
    deleteByTopicId: builder.mutation({
      query: ({ categoryId, topicId }) => ({
        url: `/api/category/${categoryId}/topic/${topicId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SectionByTopicId"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useAddSectionToCategoryMutation,
  useAddTopicToCategoryMutation,
  useDeleteBySectionIdMutation,
  useDeleteByTopicIdMutation,
} = categoryApiSlice;
