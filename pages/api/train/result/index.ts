import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case 'PUT':
      try {
        const {
          id,
          program_id,
          module_num,
          session_title,
          over_goal,
          learn_obj,
          video_litmos,
          video_train,
          video_implement,
          doc_link,
          status,
          updated_at
        } = body;
        const query = `
            UPDATE data 
            SET 
              program_id=$1, 
              module_num=$2, 
              session_title=$3, 
              over_goal=$4, 
              learn_obj=$5, 
              video_litmos=$6, 
              video_train=$7, 
              video_implement=$8, 
              doc_link=$9, 
              status=$10, 
              updated_at=$11 
            WHERE data.id = $12
          `;
        const values = [
          program_id,
          module_num,
          session_title,
          over_goal,
          learn_obj,
          video_litmos,
          video_train,
          video_implement,
          doc_link,
          status,
          updated_at,
          id
        ];
        const response = await db.query(query, values);
        return res.json(response);
      } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        return res.json('sdsdsdss');
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}
