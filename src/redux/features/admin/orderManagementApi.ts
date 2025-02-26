import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types/globelType";
import { TOrder } from "@/types/orderType";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetAllOrdersQuery } = orderApi;
