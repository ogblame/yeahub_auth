import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getAccessToken, saveAccessToken, expireSession } from "./auth";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.yeatwork.ru",
  credentials: "include",

  prepareHeaders: (headers) => {
    const token = getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

type RefreshResult =
  | { success: true }
  | { success: false; error: FetchBaseQueryError };

let refreshPromise: Promise<RefreshResult> | null = null;

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  const tokenBeforeRequest = getAccessToken();

  const result = await baseQuery(args, api, extraOptions);

  const skipRefresh = ["signIn", "signUp", "refreshSession"].includes(
    api.endpoint,
  );

  if (result.error?.status !== 401 || skipRefresh) {
    return result;
  }

  if (tokenBeforeRequest && !getAccessToken()) {
    return result;
  }

  const tokenAlreadyUpdated =
    getAccessToken() !== null && getAccessToken() !== tokenBeforeRequest;

  if (!tokenAlreadyUpdated) {
    if (!refreshPromise) {
      refreshPromise = (async (): Promise<RefreshResult> => {
        const refresh = await baseQuery(
          { url: "/auth/refresh", method: "GET" },
          api,
          extraOptions,
        );

        if (refresh.error) {
          if (refresh.error.status === 401) {
            expireSession();
          }

          return { success: false, error: refresh.error };
        }

        const data: unknown = refresh.data;

        if (
          typeof data !== "object" ||
          data === null ||
          !("access_token" in data) ||
          typeof data.access_token !== "string" ||
          !data.access_token
        ) {
          return {
            success: false,
            error: {
              status: "CUSTOM_ERROR",
              error: "Сервер не вернул access_token",
            },
          };
        }

        saveAccessToken(data.access_token);

        return { success: true };
      })().finally(() => {
        refreshPromise = null;
      });
    }

    const refreshResult = await refreshPromise;

    if (refreshResult.success === false) {
      return { error: refreshResult.error };
    }
  }

  const retry = await baseQuery(args, api, extraOptions);

  if (retry.error?.status === 401) {
    expireSession();
  }

  return retry;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
