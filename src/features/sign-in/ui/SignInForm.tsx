import { useForm } from "react-hook-form";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import styles from "./SignInForm.module.css";

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

  function onSubmit(values: SignInFormValues) {
    console.log("Email из формы:", values.email);
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

      <Button type="submit">Вход</Button>
    </form>
  );
}
