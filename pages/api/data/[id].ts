import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  switch (method) {
    case 'GET':
      try {
        const querys = `SELECT data.*,program.name as program_name, train_history.status as status  from data left join program on program.id = data.program_id LEFT JOIN train on data.train_id = train.id left join train_history on train_history.train_id = train.id WHERE data.program_id = ${query.id} AND data.is_deleted = FALSE group by data.id,program.name, train_history.status order by data.id`;
        const response = await db.query(querys);
        return res.json(response);
      } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }
    case 'DELETE':
      try {
        const querys = `UPDATE data SET is_deleted = true WHERE id = ${query.id}`;
        const response = await db.query(querys);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
