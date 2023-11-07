import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case 'POST':
      try {
        const { user_id, content, time, parent_id } = body;
        const query =
          'INSERT INTO chat_history(user_id, content, time, parent_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [user_id, content, time, parent_id];
        const response = await db.query(query, values);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
