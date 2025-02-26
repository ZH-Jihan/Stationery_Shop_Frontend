import { TResponseRedux } from "@/types/globelType";
import { TOrder } from "@/types/orderType";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.keys(args).forEach((key) => {
            const value = args[key];
            if (value) {
              params.append(key, value);
            }
          });
        }
        return {
          url: "/orders/won_order",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return response.data;
      },
    }),
    createOrders: builder.mutation({
      query: (orderData) => ({
        url: `/orders`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["order"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `/orders/payment_verify`,
        params: { order_id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrdersMutation,
  useVerifyOrderQuery,
  useGetUserOrdersQuery,
} = orderApi;
