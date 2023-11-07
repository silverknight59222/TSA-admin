import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case 'POST':
      try {
        const {
          id,
          team_id,
          name,
          deleted,
          color,
          real_name,
          tz,
          tz_label,
          tz_offset,
          profile,
          is_admin,
          is_owner,
          is_primary_owner,
          is_restricted,
          is_ultra_restricted,
          is_bot,
          is_app_user,
          updated,
          is_email_confirmed,
          who_can_share_contact_card
        } = body;
        const query =
          'INSERT INTO slack_user(id, team_id, name, deleted, color, real_name, tz, tz_label, tz_offset, profile, is_admin, is_owner, is_primary_owner, is_restricted, is_ultra_restricted, is_bot, is_app_user, updated, is_email_confirmed, who_can_share_contact_card ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *';
        const values = [
          id,
          team_id,
          name,
          deleted,
          color,
          real_name,
          tz,
          tz_label,
          tz_offset,
          profile,
          is_admin,
          is_owner,
          is_primary_owner,
          is_restricted,
          is_ultra_restricted,
          is_bot,
          is_app_user,
          updated,
          is_email_confirmed,
          who_can_share_contact_card
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
