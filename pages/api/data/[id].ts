import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  switch (method) {
    case 'GET':
      try {
        const querys = `SELECT DATA .*,program.NAME AS program_name,train_history.status AS status FROM DATA LEFT JOIN program ON program.ID = DATA.program_id LEFT JOIN train ON train.id = DATA.train_id left join train_history on train_history.train_id = train.id WHERE DATA.program_id = 1 AND DATA.is_deleted = FALSE or data.id = train_history.data_id GROUP BY DATA.ID, program.NAME, train_history.status ORDER BY DATA.ID `;
        const response = await db.query(querys);
        return res.json(response);
      } catch (error: any) {
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
