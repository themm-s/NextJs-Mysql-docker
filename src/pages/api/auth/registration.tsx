import { createHash } from "crypto";
import connection from "../mysql";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";

export default async function registration(req: NextApiRequest, res: NextApiResponse) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) return res.status(400).json({ error: 'Name, email and password are required' });

  const hash = createHash("sha256").update(password).digest("hex");
  const salt = createHash("sha256").update(password + email).digest("hex");
  const identifer = createHash("sha256").update(hash + salt).digest("hex");

  try {
    await connection.query("INSERT INTO nextmysql.users (username, email, password_hash, salt) VALUES (?, ?, ?, ?)", [username, email, hash, identifer]);
  } catch (error) {
    return res.status(400).json({ error: 'User already exists' });
  }

  res.setHeader('Set-Cookie', `salt=${identifer}; path=/; httpOnly; sameSite=strict; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toUTCString()}`);
  return res.status(200).redirect('/');
}