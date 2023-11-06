const pgp = require('pg-promise')();
const db = pgp({
  host: 'tsa-admin.cx0qgqgazzgb.us-west-1.rds.amazonaws.com',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

export default db;
