import { apiSlice } from "./apiSlice";

export const sectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSections: builder.query({
      query: () => "/api/sections",
      providesTags: ["Sections"],
      invalidatesTags: ["Sections"],
    }),
    getSectionsGroup: builder.query({
      query: () => "/api/sections/grouped",
      providesTags: ["Sections"],
      invalidatesTags: ["Sections"],
    }),
    getSectionsByCategoryId: builder.query({
      query: (categoryId) => `/api/sections/category/${categoryId}`,
      providesTags: ["SectionByCategorieId"],
      invalidatesTags: ["SectionByCategorieId"],
    }),

    addSection: builder.mutation({
      query: (formData) => ({
        url: "/api/sections",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Sections"],
    }),
    updateSection: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/sections/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Sections"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetSectionsQuery,
  useGetSectionsGroupQuery,
  useGetSectionsByCategoryIdQuery,
  useAddSectionMutation,
  useUpdateSectionMutation,
} = sectionApiSlice;
