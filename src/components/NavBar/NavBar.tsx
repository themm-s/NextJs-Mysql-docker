"use client";
import { useEffect, useState } from 'react';
import nav from './NavBar.module.scss';
import { TUser } from '@/types/user';
import { useRouter } from 'next/router';
import Link from 'next/link';
const NavBar = () => {
  const [user, setUser] = useState<TUser>();
  const navigate = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(localStorage.getItem('user')!));
    }
  }, [user]);

  if (user === undefined) {
    return <nav className={nav.navbar}>Loading...</nav>;
  }
  return (
    <nav className={nav.navbar}>
      <ul>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>
      <div className={nav.items}>
        <h1>{user?.username}</h1>
        <button onClick={user?.username ?
          () => { localStorage.removeItem('user'); fetch('/api/auth/logout'); }
          :
          () => navigate.push('/auth/login')}>
          {user?.username ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;