import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  switch (method) {
    case 'GET':
      try {
        const querys = `SELECT
        train_history.*,
        train.start_at,
        train.completed_at,
        data.id as dataid,
        data.module_num,
        program.name as program_name,
        users.name as username
      FROM
        train_history
        LEFT JOIN train ON train_history.train_id = train.ID 
        left join data on data.id = train_history.data_id
        left join program on program.id = data.program_id
        left join users on train.created_by = users.id
      WHERE
        train.ID = ${query.id}
      GROUP BY
        train.start_at,
        train.completed_at,
        train_history.ID,
        data.id,
        program.name,
        users.name
      order by data.id `;
        const response = await db.query(querys);
        return res.json(response);
      } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        const querys = `SELECT * from train WHERE id = ${query.id}`;
        const response = await db.query(querys);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'DELETE':
      try {
        const querys = `UPDATE train SET is_deleted = true WHERE id = ${query.id}`;
        const response = await db.query(querys);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
