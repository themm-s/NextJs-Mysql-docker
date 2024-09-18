import { createHash } from "crypto";
import connection from "../mysql";
import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!req.cookies) return res.status(401).json({ error: "Unauthorized" });

  if (!username || !password) return res.status(400).json({ error: "Name and password are required" });

  const [users] = await connection.query<RowDataPacket[]>("SELECT * FROM nextmysql.users WHERE username = ?", [username]);

  const hash = createHash("sha256").update(password).digest("hex");
  const salt = createHash("sha256").update(password + users[0]?.email).digest("hex");
  const identifer = createHash("sha256").update(hash + salt).digest("hex");

  if (users[0]?.password_hash !== hash || users[0]?.salt !== identifer) return res.status(401).json({ error: "Invalid credentials" });

  if (!users) return res.status(401).json({ error: "Invalid credentials" });
  const cookieOptions = `path=/; httpOnly; sameSite=strict; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toUTCString()}`;
  res.writeHead(200, {
    'set-cookie': [
      `user=${encodeURIComponent(JSON.stringify(users[0]))}; ${cookieOptions}`,
      `salt=${identifer}; ${cookieOptions}`
    ]
  });
  return res.status(200).json({ user: users[0] });
}