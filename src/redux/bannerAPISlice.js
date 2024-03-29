import { apiSlice } from "./apiSlice";

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => "/api/banners",
      providesTags: ["Banners"],
    }),
    addBanner: builder.mutation({
      query: (formData) => ({
        url: "/api/banners",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Banners"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/api/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banners"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetBannersQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
} = bannerApiSlice;
