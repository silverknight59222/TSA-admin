import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case 'PUT':
      try {
        const {
          program_id,
          module_num,
          session_title,
          video_link,
          doc_link,
          updated_at,
          id
        } = body;
        const query = `UPDATE data SET program_id=${program_id}, module_num='${module_num}', session_title='${session_title}', video_link='${video_link}', doc_link='${doc_link}', updated_at='${updated_at}' WHERE data.id = ${id}`;
        const response = await db.query(query);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        const {
          program_id,
          module_num,
          session_title,
          video_link,
          doc_link,
          created_at,
          status
        } = body;
        const query =
          'INSERT INTO data(program_id, module_num, session_title, video_link, doc_link, created_at, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [
          parseInt(program_id),
          module_num,
          session_title,
          video_link,
          doc_link,
          created_at,
          status
        ];
        const response = await db.query(query, values);

        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
