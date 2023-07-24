import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findUserByPhoneNo: builder.query({
      query: (phoneNo) => `/api/users/phoneNo/${phoneNo}`,
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

export const { useLazyFindUserByPhoneNoQuery, useUpdateUserMutation } =
  userApiSlice;
