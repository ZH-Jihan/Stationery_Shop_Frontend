import { TResponseRedux } from "@/types/globelType";
import { TProductResponse } from "@/types/productType";
import { baseApi } from "../../api/baseApi";

const featuredProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
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
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TProductResponse[]>) => {
        return response.data;
      },
    }),
    getSIngleProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProductResponse>) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetSIngleProductQuery, useGetAllProductQuery } =
  featuredProductApi;
