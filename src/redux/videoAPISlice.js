import { apiSlice } from "./apiSlice";

export const videoAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: (sectionId) => `/api/videos/${sectionId}`,
      providesTags: ["video"],
    }),
    addVideo: builder.mutation({
      query: ({ sectionId, body }) => ({
        url: `/api/videos/${sectionId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["video"],
    }),
    updateVideo: builder.mutation({
      query: ({ sectionId, body }) => ({
        url: `/api/videos/${sectionId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["video"],
    }),
    deleteById: builder.mutation({
      query: (sectionId) => ({
        url: `/api/videos/${sectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["video"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetVideoQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteByIdMutation,
} = videoAPISlice;
