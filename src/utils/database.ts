import pgPromise from 'pg-promise';

const pgp = pgPromise();

// Please replace the below connection details with your own
const connection = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '1'
};

const db = pgp(connection);

export default db;
