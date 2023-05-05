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
        let url =
          "/api/event" +
          "?sectionId=" +
          args.sectionId +
          "&type=" +
          args.type +
          "&pageNo=" +
          args.pageNo +
          "&pageSize=" +
          args.pageSize;

        if (args.day) {
          url += "&day=" + args.day;
        }
        if (args.month) {
          url += "&month=" + args.month;
        }
        if (args.year) {
          url += "&year=" + args.year;
        }

        return url;
      },
      method: "GET",
      providesTags: ["Events"],
    }),
    addEvent: builder.mutation({
      query: ({ sectionId, body }) => ({
        url: `/api/event/section/${sectionId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: ({ eventId, body }) => ({
        url: `/api/event/${eventId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `/api/event/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetEventSectionsQuery,
  useAddEventSectionMutation,
  useUpdateEventSectionMutation,
  useDeleteEventSectionMutation,

  useGetEventBySectionIdQuery,
  useLazyGetEventsByCustomizeSearchQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApiSlice;
