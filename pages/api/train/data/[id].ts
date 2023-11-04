import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  switch (method) {
    case 'GET':
      try {
        const querys = `SELECT data.*, program.name as program_name from data LEFT JOIN program ON program_id = program.ID WHERE program_id = ${query.id} AND data.is_deleted = FALSE order by data.id`;
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
