import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../mysql';
import { RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { salt } = req.cookies;

  try {
    const [user] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE salt = ?', [salt]);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user[0].is_admin === 0) return res.status(403).json({ error: 'Unauthorized' });

    const serializedUser = JSON.stringify(user[0]);
    res.setHeader('Set-Cookie', `user=${serializedUser}; path=/; httpOnly; sameSite=strict; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toUTCString()}`);

    return res.status(200).json(user[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Database query failed' });
  }
}