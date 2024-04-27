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
          q += ` AND (slack_user.real_name LIKE '%${query.search}%' or feedback.content LIKE '%${query.search}%')`;
        const querys = `SELECT feedback.*, slack_user.real_name from feedback left join slack_user on slack_user.id = feedback.slack_user_id where ${q} order by time desc `;
        const response = await db.query(querys);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        const { user_id, content, time } = body;
        const query =
          'INSERT INTO feedback(slack_user_id, content, time) VALUES ($1, $2, $3) RETURNING *';
        const values = [user_id, content, time];
        const response = await db.query(query, values);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
