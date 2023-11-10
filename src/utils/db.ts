import db from '@/utils/database';

// eslint-disable-next-line import/no-anonymous-default-export
export async function getUser(email: any) {
  try {
    const querys = `SELECT * from users WHERE email = '${email}'`;
    const response = await db.query(querys);
    return response[0];
  } catch (error: any) {
    return 'error';
  }
}

export async function createUser(data: any) {
  try {
    const { name, email, password } = data;
    const querys = `INSERT INTO users(name,email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [name, email, password];
    const response = await db.query(querys, values);
    return response[0];
  } catch (error: any) {
    return 'error';
  }
}

export async function updateUserPassword(pass: string, user_id: string) {
  const query = `UPDATE users 
  SET password = $1, reset = $2
  WHERE id = $3`;
  console.log('*** query', query);

  // Run the query as a job
  const rows = await db.query(query, [pass, 'true', user_id]);
  console.log('***** updateUserLoginState', rows);
  return rows;
}

export async function getToken(user_id: string) {
  console.log(user_id);
  const query = `SELECT *
  FROM token
  WHERE user_id=${user_id}`;

  const res = await db.query(query);
  console.log('***** getToken', res.length);
  return res[0];
}

export async function getTokenByToken(token: string) {
  const query = `SELECT *
  FROM token
  WHERE token='${token}'`;

  const [rows, fields] = await db.query(query);
  console.log('***** getTokenByToken', fields.length);
  return rows[0];
}

export async function deleteToken(id: number) {
  const query = `DELETE 
  FROM token
  WHERE id='${id}'`;

  const rows = await db.query(query);
  console.log('***** deleteToken', rows);
  return rows;
}
export async function insertToken(data: any) {
  // Inserts the JSON objects into my_dataset:my_table.

  try {
    // Insert data into a table
    const res = await db.query(
      `INSERT INTO token (user_id, token, created_at) VALUES ($1, $2, NOW())`,
      [data.user_id, data.token]
    );

    console.log('**** insertToken', res);
    return true;
  } catch (e) {
    if (e.name === 'PartialFailureError') {
      for (const err of e.errors) {
        console.error(`Error inserting row ${err.row}`);
        console.error(err.errors);
      }
    } else {
      console.error('ERROR:', e);
    }
    console.log('*** token insert error', e);
    return false;
  }
  // console.log(`Inserted 1 row`);
}
