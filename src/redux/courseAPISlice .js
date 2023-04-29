import { apiSlice } from "./apiSlice";



export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/api/sections",
      providesTags: ["Courses"],
    }),
  }),
  overrideExisting: true,
 
});

export const { useGetCoursesQuery } = coursesApiSlice;
