import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', 'salt=; path=/; httpOnly; sameSite=strict; expires=Thu, 01 Jan 1970 00:00:00 GMT').status(200).json({});

  return res.status(200).redirect('/');
}