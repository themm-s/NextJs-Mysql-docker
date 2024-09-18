import { useEffect, useState } from 'react';
import nav from './NavBar.module.scss';
import { TUser } from '@/types/user';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NavBar() {
  const [user, setUser] = useState<TUser>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('/api/getUser/get/').finally(() => setIsLoading(false));
      const data = await res.json();
      console.log(data);
      setUser(data);
    };
    getUser();
  }, []);

  if (isLoading) return <nav className={nav.navbar}>Loading...</nav>;

  return (
    <nav className={nav.navbar}>
      <ul>
        <li>
          {/* Компоненты... */}
          {/* <Link href="/admin">Admin</Link> */}
        </li>
      </ul>
      <div className={nav.items}>
        <button onClick={user?.username ? () => fetch('/api/auth/logout') : () => navigate.push('/auth/login')}>{user?.username ? 'Logout' : 'Login'}</button>
      </div>
    </nav>
  );
};

