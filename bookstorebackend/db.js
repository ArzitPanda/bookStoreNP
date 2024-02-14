const { Pool } = require('pg');

// Define your PostgreSQL connection string
const connectionString = 'postgres://sdllssrk:kbqLbsXHIQQI5nqOrGz-mZ96luWuBP0o@mouse.db.elephantsql.com/sdllssrk';

// Create a new Pool instance with the connection string
const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;