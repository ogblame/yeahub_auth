import { baseApi } from "../../../shared/api";

type User = {
  id: string;
  username: string;
  email: string;
};

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => "/auth/profile",
    }),
  }),
});

export const { useGetProfileQuery } = userApi;
