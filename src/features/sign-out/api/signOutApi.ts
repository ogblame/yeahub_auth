import { baseApi } from "../../../shared/api";

const signOutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useSignOutMutation } = signOutApi;
