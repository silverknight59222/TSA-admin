import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  switch (method) {
    case 'GET':
      try {
        const querys = `SELECT DATA
        .*,
        program.NAME AS program_name,
        train.status as train_status
        
      FROM
        DATA LEFT JOIN program ON program.ID = DATA.program_id
        LEFT JOIN train ON train.id = DATA.train_id
      WHERE
        DATA.program_id = ${query.id} 
        AND DATA.is_deleted = FALSE 
        AND (
          module_num LIKE'%${query.search}%' 
          OR session_title LIKE'%${query.search}%' 
          OR over_goal LIKE'%${query.search}%' 
          OR learn_obj LIKE'%${query.search}%' 
          OR video_litmos LIKE'%${query.search}%' 
          OR video_train LIKE'%${query.search}%' 
          OR video_implement LIKE'%${query.search}%' 
          OR data.status LIKE '%${query.search}%' 
        ) 
      GROUP BY
        DATA.ID,
        program.NAME,
        train.status 
      ORDER BY
        DATA.ID`;
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
