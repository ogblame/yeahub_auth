import { Outlet, useLocation } from "react-router-dom";
import { NavigationPrompt } from "../../../shared/ui/navigation-promt/index";
import styles from "./AuthPage.module.css";

const benefits = [
  "Пошаговый план обучения",
  "Карьерный рост",
  "Большое сообщество специалистов",
  "Обучение с ментором",
  "Возможность прохождения стажировки",
];

export function AuthPage() {
  const { pathname } = useLocation();
  const isRegistration = pathname === "/register";

  const title = isRegistration ? "Регистрация" : "Вход в личный кабинет";

  const prompt = isRegistration
    ? {
        text: "Уже есть аккаунт?",
        linkText: "Войти",
        to: "/login",
      }
    : {
        text: "Нет аккаунта?",
        linkText: "Зарегистрироваться",
        to: "/register",
      };

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.logo}>Yeahub</span>
          <p className={styles.tagline}>YeaHub объединяет IT-специалистов</p>
        </div>

        <div className={styles.community}>
          <h2 className={styles.communityTitle}>
            Стань частью сообщества YeaHub и получи:
          </h2>

          <ul className={styles.benefits}>
            {benefits.map((benefit) => (
              <li key={benefit} className={styles.benefit}>
                <span className={styles.check} aria-hidden="true">
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <section className={styles.content} aria-labelledby="auth-title">
        <div className={styles.formBlock}>
          <h1 id="auth-title" className={styles.title}>
            {title}
          </h1>

          <Outlet />
        </div>

        <div className={styles.navigation}>
          <NavigationPrompt {...prompt} />
        </div>
      </section>
    </main>
  );
}
