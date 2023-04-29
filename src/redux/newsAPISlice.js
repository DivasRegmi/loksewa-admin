import { apiSlice } from "./apiSlice";

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewsSections: builder.query({
      query: () =>
        "/api/news-sections/" ,
      providesTags: ["NewsSection"],
    }),
    getNewsBySectionId: builder.query({
        query: (args) =>
          "/api/news/section/" +
          args.sectionId +
          "?pageNo=" +
          args.pageNo +
          "&pageSize=" +
          args.pageSize ,
        providesTags: ["News"],
      }),
    getNewsOfWeek: builder.query({
      query: () => "/api/news/grouped-by-date", 
      providesTags: ["NewsByWeek"],
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetNewsBySectionIdQuery, useGetNewsOfWeekQuery, useGetNewsSectionsQuery } = newsApiSlice;
