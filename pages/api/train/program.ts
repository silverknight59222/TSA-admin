import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM program';
        const response = await db.query(query);
        return res.json(response);
      } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        const { title, description } = body;

        const query =
          'INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *';
        const values = [title, description];

        const response = await db.query(query, values);

        return res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
