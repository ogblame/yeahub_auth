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

  const [signUp, { isLoading, isError, isSuccess }] = useSignUpMutation();

  async function onSubmit(values: SignUpFormValues) {
    try {
      await signUp({
        username: values.nickname,
        email: values.email,
        password: values.password,
      }).unwrap();
    } catch {}
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Никнейм</span>
          <Input
            {...register("nickname")}
            placeholder="Введите никнейм"
            autoComplete="username"
          />
        </label>

        <label className={styles.field}>
          <span>Электронная почта</span>
          <Input
            type="email"
            {...register("email")}
            placeholder="Введите электронную почту"
            autoComplete="email"
          />
        </label>

        <label className={styles.field}>
          <span>Пароль</span>
          <Input
            type="password"
            {...register("password")}
            placeholder="Введите пароль"
            autoComplete="new-password"
          />
        </label>

        <label className={styles.field}>
          <span>Подтвердить пароль</span>
          <Input
            type="password"
            placeholder="Повторите пароль"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
        </label>
      </div>

      <Button type="submit">Зарегистрироваться</Button>

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
