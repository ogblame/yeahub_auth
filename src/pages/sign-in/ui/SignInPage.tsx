import { SignInForm } from "../../../features/sign-in/ui/SignInForm";
import { NavigationPrompt } from "../../../shared/ui/navigation-promt";

export function SignInPage() {
  return (
    <div>
      <h1>Вход в личный кабинет</h1>
      <SignInForm />
      <NavigationPrompt
        text="Нет аккаунта?"
        linkText="Зарегистрироваться"
        href="/register"
      />
    </div>
  );
}
