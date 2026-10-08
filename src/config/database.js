const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'mindascii',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mindascii',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool = null;

function initializeDatabase() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Database initialization deferred (SQLite/JSON storage for development)');
    return;
  }
  try {
    const mysql = require('mysql2/promise');
    pool = mysql.createPool(dbConfig);
    console.log('MariaDB pool created');
  } catch (err) {
    console.error('MariaDB not configured, using file storage');
  }
}

function getPool() {
  return pool;
}

module.exports = {
  dbConfig,
  initializeDatabase,
  getPool
};
