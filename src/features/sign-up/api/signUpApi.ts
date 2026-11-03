import { baseApi } from "../../../shared/api";

type SignUpRequest = {
  username: string;
  email: string;
  password: string;
};

type SignUpResponse = {
  access_token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
};

const signUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: "/auth/signUp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation } = signUpApi;
