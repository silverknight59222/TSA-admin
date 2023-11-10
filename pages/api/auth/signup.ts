import type { NextApiRequest, NextApiResponse } from 'next/types';
import db from '@/utils/database';
import { getUser, createUser } from '@/utils/db';
import bcrypt from 'bcryptjs';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    await db.connect();

    const { body } = req;

    const existUser = await getUser(body.email);
    if (existUser)
      return res.status(403).json({ message: 'User already existed.' });

    body.password = await bcrypt.hash(body.password, 12);

    const user = await createUser(body);
    if (!user) return res.status(500).json({ message: 'Create user error' });

    return res.status(200).json({ message: 'success' });
  }

  return res.status(405);
};

export default register;
