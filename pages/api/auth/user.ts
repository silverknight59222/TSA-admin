import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (email: any) {
  try {
    const querys = `SELECT * from users WHERE email = '${email}'`;
    const response = await db.query(querys);
    return response[0];
  } catch (error: any) {
    return 'error';
  }
}
