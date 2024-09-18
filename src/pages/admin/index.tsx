import { TUser } from "@/types/user";
import connection from "../api/mysql";
import React from "react";
import Link from "next/link";

export default function AdminPanel({ data }: { data: TUser[]; }) {
  return (
    <section className="container mx-auto backdrop-blur-sm h-screen w-2/4 text-gray-300 flex flex-col gap-4 text-center">
      <Link href='/' className="absolute mx-3 my-1 text-lg font-normal">Назад</Link>
      <h1 className="text-3xl font-bold font-serif">Зарегистрированные пользователи</h1>
      <ul className="flex flex-col gap-4 text-lg">
        {data.map((item: TUser) => (
          <React.Fragment key={item.user_id}>
            <li className="rounded p-3 bg-blue-400 bg-opacity-15" key={item.user_id}>
              <p>{item.email} - {item.username}</p>
              <div className="flex justify-center">
                <p>
                  <Link href={`/admin/${item.user_id}`}>Подробнее</Link>
                </p>
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
}
export async function getServerSideProps() {
  const [rows] = await connection.query('SELECT * FROM nextmysql.users;');
  // console.log(rows);
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