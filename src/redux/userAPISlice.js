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

    deleteAccount: builder.mutation({
      query: ({ phoneNumber, reasonForDeletion }) => {
        return {
          url: `/api/delete-account`,
          method: "POST",
          body: { phoneNumber, reasonForDeletion },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyFindUserByPhoneNoQuery,
  useUpdateUserMutation,
  useDeleteAccountMutation,
} = userApiSlice;
