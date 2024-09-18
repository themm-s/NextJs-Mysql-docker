import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../mysql';
import { QueryResult, RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { salt } = req.query;
  console.log(req.cookies);
  console.log('handle');
  try {
    const [user] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE salt = ?', [salt]);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user[0].is_admin === 0) return res.status(403).json({ error: 'Unauthorized' });
    return res.status(200).json(user[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Database query failed' });
  }
}