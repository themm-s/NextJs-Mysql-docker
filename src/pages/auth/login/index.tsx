"use client";
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// TODO: Добавить контекст для передачи состояния!!! Сейчас сделано неправильно

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const sendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/');
        return;
      }

      if (res.status === 400) {
        setError('Неверное имя пользователя или пароль');
        return;
      }

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error('Произошла ошибка:', err);
      setError('Произошла ошибка. Попробуйте снова.');
    }
  };

  return (
    <section className="container mx-auto justify-center text-center">
      <h1 className="text-3xl">Логин</h1>
      <form className="flex flex-col gap-6" onSubmit={sendRequest}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-1/4 text-center mx-auto border border-blue-600 
            hover:bg-blue-400 transition delay-100 duration-300 p-3 rounded-lg"
          type="submit"
        >
          Войти
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <Link href="/auth/registration">Зарегистрироваться</Link>
      </form>
    </section>
  );
};

export default Login;
