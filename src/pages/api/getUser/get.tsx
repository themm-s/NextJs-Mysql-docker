import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../mysql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { salt } = req.cookies;

  try {
    const [user] = await connection.query<any[]>('SELECT * FROM users WHERE salt = ?', [salt]);
    // console.log(user);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user[0].is_admin === 0) return res.status(403).json({ error: 'Unauthorized' });
    return res.status(200).json(user[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Database query failed' });
  }
}