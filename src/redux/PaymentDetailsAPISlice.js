import { apiSlice } from "./apiSlice";

export const PaymentDetailsAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentDetailsByStatus: builder.query({
      query: ({ pageNo, pageSize, status }) =>
        `/api/payments?pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`,
      providesTags: ["paymentDetails"],
    }),
    getPaymentDetailsByUserId: builder.query({
      query: ({userId, pageNo, pageSize }) =>
        `/api/payments/users/${userId}?pageNo=${pageNo}&pageSize=${pageSize}`,
      providesTags: ["paymentDetails"],
    }),
    getPaymentReferCount: builder.query({
      query: () => `api/payments/refer-by-count`,
    }),
    updatePaymentDetails: builder.mutation({
      query: ({ paymentDetailsId, status }) => ({
        url: `/api/payments/${paymentDetailsId}/${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["paymentDetails"],
    }),
    deletePaymentDetail: builder.mutation({
      query: (paymentDetailsId) => ({
        url: `/api/payments/${paymentDetailsId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["paymentDetails"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPaymentDetailsByStatusQuery,
  useGetPaymentDetailsByUserIdQuery,
  useGetPaymentReferCountQuery,
  useUpdatePaymentDetailsMutation,
  useDeletePaymentDetailMutation,
} = PaymentDetailsAPISlice;
