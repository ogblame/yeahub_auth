import { useGetProfileQuery } from "../../../entities/user";
import { SignOutButton } from "../../../features/sign-out";

export function ProfilePage() {
  const { data: user, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return <p>Загружаем профиль…</p>;
  }

  if (isError) {
    return <p role="alert">Не удалось загрузить профиль.</p>;
  }

  if (!user) {
    return <p>Данные пользователя отсутствуют.</p>;
  }

  return (
    <main>
      <h1>Личный кабинет</h1>
      <p>Никнейм: {user.username}</p>
      <p>Почта: {user.email}</p>
      <SignOutButton />
    </main>
  );
}
