import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case 'PUT':
      try {
        const { id, status, train_id } = body;
        const query = `UPDATE train_history SET status=$1 and completed_at='${new Date()}' WHERE data_id = $2 and train_id = $3`;
        const values = [status, id, train_id];
        await db.query(query, values);
        const q = `UPDATE data SET status=$1 WHERE id = $2 and train_id = $3`;
        await db.query(q, values);
        return res.json({ id, status, train_id });
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'GET':
      try {
        try {
          let q = 'train_history.is_deleted = false';
          // if (query.search)
          //   q += ` AND (slack_user.real_name LIKE '%${query.search}%' or chat_history.content LIKE '%${query.search}%')`;
          const querys = `SELECT train_history.*, users.name as username,train.start_at, train.completed_at FROM train_history LEFT join train on train_history.train_id = train.id LEFT join data on data.id = train_history.data_id LEFT join users on train.created_by = users.id where ${q} order by train.created_at desc `;
          console.log(querys);
          const response = await db.query(querys);
          return res.json(response);
        } catch (error: any) {
          console.log(error.message);
          return res.status(400).json({ message: error.message });
        }
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
