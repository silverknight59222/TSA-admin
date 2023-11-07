const pgp = require('pg-promise')();
const db = pgp({
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

export default db;
