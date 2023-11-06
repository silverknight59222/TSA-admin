import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM program where is_deleted = false';
        const response = await db.query(query);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'PUT':
      try {
        const { id, name, description } = body;
        const query = `
              UPDATE program 
              SET 
                name=$1, 
                description=$2
              WHERE id = $3
            `;
        const values = [name, description, id];
        const response = await db.query(query, values);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        const { name, description } = body;

        const query =
          'INSERT INTO program(name, description) VALUES ($1, $2) RETURNING *';
        const values = [name, description];

        const response = await db.query(query, values);

        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
