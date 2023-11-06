import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case 'PUT':
      try {
        const { id, status } = body;
        const query = `UPDATE train_history SET status=$1 WHERE data_id = $2`;
        const values = [status, id];
        await db.query(query, values);
        return res.json({ id, status });
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        const {
          program_id,
          module_num,
          session_title,
          over_goal,
          learn_obj,
          video_litmos,
          video_train,
          video_implement,
          doc_link,
          created_at,
          status
        } = body;
        const query =
          'INSERT INTO data(program_id, module_num, session_title, over_goal, learn_obj, video_litmos, video_train, video_implement, doc_link, created_at, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
        const values = [
          parseInt(program_id),
          module_num,
          session_title,
          over_goal,
          learn_obj,
          video_litmos,
          video_train,
          video_implement,
          doc_link,
          created_at,
          status
        ];
        const response = await db.query(query, values);

        return res.json(response);
      } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
