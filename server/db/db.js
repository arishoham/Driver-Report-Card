const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.PG_URI;

// https://drawsql.app/ari-1/diagrams/driver-report-card

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
