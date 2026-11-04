import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import styles from "./SignUpForm.module.css";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "../api/signUpApi";

type SignUpFormValues = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [signUp, { isLoading, isError, error, isSuccess }] =
    useSignUpMutation();

  async function onSubmit(values: SignUpFormValues) {
    try {
      await signUp({
        username: values.nickname,
        email: values.email,
        password: values.password,
      }).unwrap();
    } catch {}
  }
  let serverErrorMessage = "Не удалось зарегистрироваться. Попробуйте позже.";

  if (error && "status" in error) {
    if (error.status === 409) {
      serverErrorMessage =
        "Пользователь с таким никнеймом или почтой уже существует.";
    } else if (error.status === "FETCH_ERROR") {
      serverErrorMessage =
        "Не удалось связаться с сервером. Проверьте соединение.";
    }
  }

  {
    isError && (
      <p className={styles.error} role="alert">
        {serverErrorMessage}
      </p>
    );
  }

  {
    isSuccess && <p role="status">Аккаунт создан. Теперь можно войти.</p>;
  }

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Никнейм</span>

          <Input
            placeholder="Введите никнейм"
            autoComplete="username"
            aria-invalid={Boolean(errors.nickname)}
            {...register("nickname", {
              required: "Введите никнейм",
              validate: (value) =>
                value.trim().length > 0 ||
                "Никнейм не может состоять из пробелов",
            })}
          />

          {errors.nickname && (
            <span className={styles.error} role="alert">
              {errors.nickname.message}
            </span>
          )}
        </label>

        <label className={styles.field}>
          <span>Электронная почта</span>

          <Input
            type="email"
            placeholder="Введите электронную почту"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email", {
              required: "Введите электронную почту",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введите почту в формате name@example.com",
              },
            })}
          />

          {errors.email && (
            <span className={styles.error} role="alert">
              {errors.email.message}
            </span>
          )}
        </label>

        <label className={styles.field}>
          <span>Пароль</span>

          <Input
            type="password"
            placeholder="Введите пароль"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            {...register("password", {
              required: "Введите пароль",
              minLength: {
                value: 8,
                message: "Пароль должен содержать минимум 8 символов",
              },
            })}
          />

          {errors.password && (
            <span className={styles.error} role="alert">
              {errors.password.message}
            </span>
          )}
        </label>

        <label className={styles.field}>
          <span>Подтвердить пароль</span>

          <Input
            type="password"
            placeholder="Повторите пароль"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.confirmPassword)}
            {...register("confirmPassword", {
              required: "Повторите пароль",
              validate: (value) =>
                value === getValues("password") || "Пароли не совпадают",
            })}
          />

          {errors.confirmPassword && (
            <span className={styles.error} role="alert">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
      </div>
      <Button type="submit" disabled={isLoading || isSuccess}>
        {isLoading ? "Регистрируем…" : "Зарегистрироваться"}
      </Button>
      ;
      <fieldset className={styles.consents}>
        <legend className={styles.legend}>
          Проставив галочку и нажимая «Зарегистрироваться»:
        </legend>

        <label className={styles.consent}>
          <input type="checkbox" name="personalDataConsent" />
          <span>
            Даю согласие на обработку персональных данных в соответствии с
            политикой в отношении ПД
          </span>
        </label>

        <label className={styles.consent}>
          <input type="checkbox" name="adultConfirmation" />
          <span>Я подтверждаю, что ознакомился(-ась) с договором-офертой</span>
        </label>

        <label className={styles.consent}>
          <input type="checkbox" name="marketingConsent" />
          <span>
            Даю согласие на получение рекламных и информационных рассылок
          </span>
        </label>
      </fieldset>
    </form>
  );
}
