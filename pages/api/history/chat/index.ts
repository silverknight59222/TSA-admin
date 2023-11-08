import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  switch (method) {
    case 'GET':
      try {
        let q = 'is_deleted = false';
        if (query.search)
          q += ` AND (slack_user.real_name LIKE '%${query.search}%' or chat_history.content LIKE '%${query.search}%')`;
        const querys = `SELECT chat_history.*, slack_user.real_name as username FROM chat_history LEFT join slack_user on chat_history.user_id = slack_user.id where ${q} order by time desc `;
        console.log(querys);
        const response = await db.query(querys);
        return res.json(response);
      } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }
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
