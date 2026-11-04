import { useDispatch } from "react-redux";
import { clearSession } from "../../../entities/session";
import { baseApi } from "../../../shared/api";
import { Button } from "../../../shared/ui/button";
import { useSignOutMutation } from "../api/signOutApi";

export function SignOutButton() {
  const dispatch = useDispatch();
  const [signOut, { isLoading, isError }] = useSignOutMutation();

  async function handleSignOut() {
    try {
      await signOut().unwrap();

      dispatch(clearSession());
      dispatch(baseApi.util.resetApiState());
    } catch {
      // При ошибке оставляем возможность повторить выход.
    }
  }

  return (
    <div>
      <Button type="button" onClick={handleSignOut} disabled={isLoading}>
        {isLoading ? "Выходим…" : "Выйти"}
      </Button>

      {isError && (
        <p role="alert">
          Не удалось завершить выход на сервере. Попробуйте снова.
        </p>
      )}
    </div>
  );
}
