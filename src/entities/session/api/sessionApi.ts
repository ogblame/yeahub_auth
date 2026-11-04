import { baseApi } from "../../../shared/api";

type RefreshSessionResponse = {
  access_token: string;
};

const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    refreshSession: builder.mutation<RefreshSessionResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
    }),
  }),
});

export const { useRefreshSessionMutation } = sessionApi;
