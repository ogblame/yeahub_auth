import { useForm } from "react-hook-form";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import styles from "./SignInForm.module.css";
import { useSignInMutation } from "../api/signInApi";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../../entities/session";
import { useNavigate } from "react-router-dom";

type SignInFormValues = {
  email: string;
  password: string;
};

export function SignInForm() {
  const { register, handleSubmit } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [signIn, { isLoading, isError, isSuccess }] = useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(values: SignInFormValues) {
    try {
      const response = await signIn({
        username: values.email,
        password: values.password,
      }).unwrap();

      dispatch(setAccessToken(response.access_token));
      navigate("/profile", { replace: true });
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  }

  {
    isError && (
      <p role="alert">
        Не удалось войти. Проверьте данные или попробуйте позже.
      </p>
    );
  }

  {
    isSuccess && <p role="status">Запрос входа выполнен успешно.</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.field}>
        <span>Электронная почта</span>
        <Input
          type="email"
          placeholder="Введите электронную почту"
          {...register("email")}
        />
      </label>

      <label className={styles.field}>
        <span>Пароль</span>
        <Input
          type="password"
          placeholder="Введите пароль"
          {...register("password")}
        />
      </label>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Входим…" : "Вход"}
      </Button>
    </form>
  );
}
