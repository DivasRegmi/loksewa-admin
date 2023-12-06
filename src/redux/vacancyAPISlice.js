import { apiSlice } from "./apiSlice";

export const vacancyAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVacancyList: builder.query({
      query: () => `/api/vacancies`,
      providesTags: ["vacancy"],
    }),
    addVacancy: builder.mutation({
      query: ( body) => ({
        url: `/api/vacancies`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["vacancy"],
    }),
    updateVacancy: builder.mutation({
      query: ({ vacancyId, body }) => ({
        url: `/api/vacancies/${vacancyId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["vacancy"],
    }),
    deleteById: builder.mutation({
      query: (vacancyId) => ({
        url: `/api/vacancies/${vacancyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vacancy"],
    }),
  }),
  overrideExisting: true,
});                 

export const {
useGetVacancyListQuery,
useAddVacancyMutation,
useUpdateVacancyMutation,
useDeleteByIdMutation
} = vacancyAPISlice;
