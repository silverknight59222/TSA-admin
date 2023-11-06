import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case 'PUT':
      try {
        const { id, status } = body;
        const query = `UPDATE train SET status=$1 WHERE id = $2`;
        const values = [status, id];
        await db.query(query, values);
        return res.json({ id, status });
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        const query =
          'INSERT INTO train(start_at, status) VALUES ($1, $2) RETURNING *';
        const values = [new Date(), 'training'];
        const response = await db.query(query, values);
        const querys = `SELECT data.*, program.name as program_name from data LEFT JOIN program ON program_id = program.ID WHERE program_id = ${body.program_id} AND data.is_deleted = FALSE order by data.id`;
        const data = await db.query(querys);
        const promises = data.map(async (item) => {
          const q =
            'INSERT INTO train_history(train_id, data_id, status) VALUES ($1, $2, $3) RETURNING *';
          const val = [response[0].id, item.id, 'training'];
          await db.query(q, val);
        });
        await Promise.all(promises);
        const udpate_query = `UPDATE data SET train_id=${response[0].id} WHERE program_id = ${body.program_id}`;
        await db.query(udpate_query);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
