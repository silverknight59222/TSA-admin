import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  switch (method) {
    case 'PUT':
      try {
        const { id, status } = body;
        const query = `UPDATE train SET status=$1, completed_at=$2 WHERE id = $3`;
        const values = [status, new Date(), id];
        await db.query(query, values);
        return res.json({ id, status });
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'GET':
      try {
        let q = '';
        if (query.search)
          q += `and (users.name like '%${query.search}%' or program.name like '%${query.search}%' or users.name like '%${query.search}%')`;
        const querys = `select train.*, users.name as username, program.name as program_name from train 
        left join users on users.id = train.created_by 
        left join train_history on train_history.train_id = train.id
				left join data on data.id = train_history.data_id
        left join program on program.id = data.program_id
        where train.is_deleted = false ${q}
        group by train.id, users.name, program.name order by created_at desc`;
        const response = await db.query(querys);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        const query =
          'INSERT INTO train(start_at, status, created_at, created_by) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [new Date(), 'training', new Date(), 1];
        const response = await db.query(query, values);
        const querys = `SELECT data.*, program.name as program_name from data LEFT JOIN program ON program_id = program.ID WHERE program_id = ${body.program_id} AND data.is_deleted = FALSE order by data.id`;
        const data = await db.query(querys);
        const promises = data.map(async (item) => {
          const q =
            'INSERT INTO train_history(train_id, data_id, status) VALUES ($1, $2, $3) RETURNING *';
          const val = [response[0].id, item.id, 'training'];
          await db.query(q, val);
          const udpate_q = `UPDATE data SET status='training' WHERE id = ${item.id}`;
          await db.query(udpate_q);
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
