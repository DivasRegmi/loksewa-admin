import { apiSlice } from "./apiSlice";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEventSections: builder.query({
      query: () => "/api/event-sections/",
      providesTags: ["EventsSection"],
    }),
    addEventSection: builder.mutation({
      query: (title) => ({
        url: `/api/event-sections/`,
        method: "POST",
        body: { title: title },
      }),
      invalidatesTags: ["EventsSection"],
    }),
    updateEventSection: builder.mutation({
      query: ({ eventSectionId, title }) => ({
        url: `/api/event-sections/${eventSectionId}`,
        method: "PATCH",
        body: { title: title },
      }),
      invalidatesTags: ["EventsSection"],
    }),
    deleteEventSection: builder.mutation({
      query: (eventSectionId) => ({
        url: `/api/event-sections/${eventSectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventsSection"],
    }),
    getEventBySectionId: builder.query({
      query: (args) => {
        return (
          "/api/event/" +
          args.categorieBy +
          "?sectionId=" +
          args.sectionId +
          "&type=" +
          args.dateSystem +
          "&pageNo=" +
          args.pageNo +
          "&pageSize=" +
          args.pageSize
        );
      },
      providesTags: ["Events"],
    }),
    getEventsByCustomizeSearch: builder.query({
      query: ({
        dateSystem,
        sectionId,
        day,
        month,
        year,
        pageNo,
        pageSize,
      }) => {
        let queryParams = `?type=${dateSystem}&pageNo=${pageNo}&pageSize=${pageSize}`;
        if (sectionId) {
          queryParams += `&sectionId=${sectionId}`;
        }
        if (day) {
          queryParams += `&day=${day}`;
        }
        if (month) {
          queryParams += `&month=${month}`;
        }
        if (year) {
          queryParams += `&year=${year}`;
        }
        return "/api/event" + queryParams;
      },
      providesTags: ["EventsBySearch"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetEventSectionsQuery,
  useAddEventSectionMutation,
  useUpdateEventSectionMutation,
  useDeleteEventSectionMutation,
  useLazyGetEventBySectionIdQuery,
  useLazyGetEventsByCustomizeSearchQuery,
} = eventApiSlice;
