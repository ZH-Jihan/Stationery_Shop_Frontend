import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types/globelType";
import { TUser } from "../auth/authSlice";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
      providesTags: ["user"],
      transformResponse: (response: TResponseRedux<TUser>) => {
        return response.data;
      },
    }),
    updateProfile: builder.mutation({
      query: (args) => ({
        url: `/user/profile/${args.email}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUpdateProfileMutation } = userApi;
