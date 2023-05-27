import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findUserByEmail: builder.query({
      query: (email) => `/api/users/email/${email}`,
      providesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: ({ userId, body }) => {
        return {
          url: `/api/users/${userId}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLazyFindUserByEmailQuery, useUpdateUserMutation } = userApiSlice;
