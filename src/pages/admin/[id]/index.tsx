import connection from "@/pages/api/mysql";
import { TUser } from "@/types/user";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function idUser({ user }: { user: TUser[]; }) {

  console.log(user[0].created_at);
  return (
    <section className="flex flex-col backdrop-blur-sm h-screen w-2/4 text-gray-300 text-lg mx-auto text-center">
      <Link href="/admin" className="absolute ml-16 mt-3">Назад</Link>
      <h1 className="text-3xl">USER INFO {user[0].username}</h1>
      <ul>
        {user.map((item: TUser) => (
          <React.Fragment key={item.user_id}>
            <li>UserID: {item.user_id}</li>
            <li>Username: {item.username}</li>
            <li>PassHash: {item.password_hash}</li>
            <li>Email: {item.email}</li>
            <li>Status: {item.is_active ? 'Active' : 'Not active'}</li>
            <li>Role: {item.is_admin ? 'Admin' : 'User'}</li>
            <li>Created: {item.created_at.toString()}</li>
            <li>Updated: {item.updated_at.toString()}</li>
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
}

export async function getServerSideProps(params: { params: { id: string; }; }) {
  console.log(params.params.id);
  // console.log(params);
  const [user] = await connection.query("SELECT * FROM nextmysql.users WHERE user_id = ?", [params.params.id]);

  if (!Array.isArray(user)) return { props: { user: [] } };

  return {
    props: {
      user: user.map((row: any) => ({
        ...row,
        created_at: row.created_at.toISOString(),
        updated_at: row.updated_at.toISOString(),
      }))
    },
  };
}