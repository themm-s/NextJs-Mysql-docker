import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Registration = () => {
  const [error, setError] = useState('');
  const navigate = useRouter();
  const sendRequest = async (e: any) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const res = await fetch('/api/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
      })
    });

    if (res.status === 200) {
      await navigate.push('/');
      await navigate.reload();
    }

    if (res.status === 400) {
      setError("Неверное имя пользователя или пароль");
      return;
    }
  };

  return (
    <section className="container mx-auto justify-center text-center">
      <h1 className="text-3xl">Регистрация</h1>
      <form className="flex flex-col gap-6" onSubmit={sendRequest}>
        <input type="text" autoComplete="off" placeholder="Логин" />
        <input type="text" autoComplete="off" placeholder="Почта" />
        <input type="password" autoComplete="off" placeholder="Пароль" />
        <button className={`w-1/4 text-center mx-auto border border-blue-600 
          hover:bg-blue-400 transition delay-100 duration-300 p-3 rounded-lg`} type="submit">Войти</button>
        <p className="text-red-500">{error}</p>
        <Link href="/auth/login">Есть аккаунт?</Link>
      </form>
    </section>
  );
};

export default Registration;

export async function getServerSideProps() {
  return {
    props: {}
  };
}



