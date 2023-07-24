import { apiSlice } from "./apiSlice";

export const imageAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllImages: builder.query({
      query: ({ pageNo, pageSize }) =>
        `/api/images?pageNo=${pageNo}&pageSize=${pageSize}`,
      providesTags: ["Images"],
    }),
    getAllImagesByTag: builder.query({
      query: (tag) => `/api/images/tag/${tag}`,
      providesTags: ["Images-tag"],
    }),

    addImage: builder.mutation({
      query: (formData) => ({
        url: `/api/images`,
        method: "POST",
        body: formData,
      }),
    }),
    deleteImage: builder.mutation({
      query: (imageId) => ({
        url: `/api/images/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Images", "Images-tag"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllImagesByTagQuery,
  useGetAllImagesQuery,
  useAddImageMutation,
  useDeleteImageMutation,
} = imageAPISlice;
