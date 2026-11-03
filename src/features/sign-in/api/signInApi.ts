import { baseApi } from "../../../shared/api";

type SignInRequest = {
  username: string;
  password: string;
};

type SignInResponse = {
  access_token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
};

const signInApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = signInApi;
