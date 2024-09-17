import Link from 'next/link';
import connection from './api/mysql';
import { TUser } from '@/types/user';

// SSR Компонент потому что тут есть getServerSideProps И рендериться все на стороне сервера и готова отдается клиенту

const HomePage = ({ data }: { data: TUser[]; }) => {
  return (
    <section className='container mx-auto text-center text-gray-300 text-3xl font-extraboldx flex flex-col w-2/4 backdrop-blur-sm'>
      <h1>Привет</h1>
    </section>
  );
};

export async function getServerSideProps() {
  const [rows] = await connection.query('SELECT * FROM nextmysql.users;');
  if (!Array.isArray(rows)) return { props: { data: [] } };

  return {
    props: {
      data: rows.map((row: any) => ({
        ...row,
        created_at: row.created_at.toISOString(),
        updated_at: row.updated_at.toISOString(),
      })),
    },
  };
}

export default HomePage;