import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useDispatch } from "react-redux";
import {
  clearSession,
  setAccessToken,
  useRefreshSessionMutation,
} from "../../entities/session";

type SessionProviderProps = {
  children: ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  const dispatch = useDispatch();
  const [refreshSession] = useRefreshSessionMutation();

  const [status, setStatus] = useState<"checking" | "ready" | "error">(
    "checking",
  );

  const started = useRef(false);

  const restoreSession = useCallback(async () => {
    setStatus("checking");

    try {
      const response = await refreshSession().unwrap();

      dispatch(setAccessToken(response.access_token));
      setStatus("ready");
    } catch (error) {
      const isUnauthorized =
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        error.status === 401;

      if (isUnauthorized) {
        dispatch(clearSession());
        setStatus("ready");
      } else {
        setStatus("error");
      }
    }
  }, [dispatch, refreshSession]);

  useEffect(() => {
    if (started.current) return;

    started.current = true;
    void restoreSession();
  }, [restoreSession]);

  if (status === "checking") {
    return <p role="status">Проверяем сессию…</p>;
  }

  if (status === "error") {
    return (
      <div>
        <p role="alert">Не удалось проверить сессию.</p>
        <button type="button" onClick={() => void restoreSession()}>
          Повторить
        </button>
      </div>
    );
  }

  return children;
}
