import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const { Pool } = pg;

const pool = new pg.Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT,
  user: process.env.DB_USER || 'ww1user',
  password: process.env.DB_PASSWORD || 'ww1pass', 
  database: process.env.DB_DATABASE || 'ww1db',
});


pool.connect((err, client, release) => {
  if (err) {
    console.error('DB connection FAILED:', err.message);
  } else {
    console.log('DB connection OK');
    release();
  }
});

export default pool;
