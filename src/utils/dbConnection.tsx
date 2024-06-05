import * as sql from 'mssql';

export const dbConfig = {
  server: 'QDBDEV\\MSSQLSRV2012R2',
  database: 'MINIMERCADO',
  user: 'qualidata',
  password: 'qM1t$up|iC95',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
      trustedConnection: false,
      trustServerCertificate: false
  }
};

// Connect to the database
export async function connectDB() {
  const pool = await sql.connect(dbConfig);
  return pool;
}

// Select data from the database
export async function selectDB(pool: sql.ConnectionPool, query: string) {
  const result = await pool.request().query(query);
  return result.recordset;
}

// Insert data into the database
export async function insertDB(pool: sql.ConnectionPool, query: string) {
  await pool.request().query(query);
}

// Update data in the database
export async function updateDB(pool: sql.ConnectionPool, query: string) {
  await pool.request().query(query);
}
