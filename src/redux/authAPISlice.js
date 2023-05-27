import { apiSlice } from "./apiSlice";



export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authenticate: builder.mutation({
      query: (body) => ({
        url: "/api/auth/authenticate/admin",
        method: "POST",
        body: body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/api/auth/register/admin",
        method: "POST",
        body: body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useAuthenticateMutation, useRegisterMutation } = bannerApiSlice;


