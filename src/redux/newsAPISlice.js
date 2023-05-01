import { apiSlice } from "./apiSlice";

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewsSections: builder.query({
      query: () => "/api/news-sections/",
      providesTags: ["NewsSection"],
    }),
    addNewsSection: builder.mutation({
      query: (title) => ({
        url: `/api/news-sections/`,
        method: "POST",
        body: { title: title },
      }),
      invalidatesTags: ["NewsSection"],
    }),
    updateNewsSection: builder.mutation({
      query: ({ newsSectionId, title }) => ({
        url: `/api/news-sections/${newsSectionId}`,
        method: "PATCH",
        body: { title: title },
      }),
      invalidatesTags: ["NewsSection"],
    }),
    deleteNewsSection: builder.mutation({
      query: (newsSectionId) => ({
        url: `/api/news-sections/${newsSectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NewsSection"],
    }),
    getNewsBySectionId: builder.query({
      query: (args) =>
        "/api/news/section/" +
        args.sectionId +
        "?pageNo=" +
        args.pageNo +
        "&pageSize=" +
        args.pageSize,
      providesTags: ["News"],
    }),
    getNewsOfWeek: builder.query({
      query: () => "/api/news/grouped-by-date",
      providesTags: ["NewsByWeek"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNewsSectionsQuery,
  useUpdateNewsSectionMutation,
  useAddNewsSectionMutation,
  useDeleteNewsSectionMutation,

  useLazyGetNewsBySectionIdQuery,
  useGetNewsOfWeekQuery,
} = newsApiSlice;
