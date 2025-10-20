import { Pool } from 'pg';

// Create PostgreSQL connection pool
// Use standard PostgreSQL environment variables
const isRunningInDocker = process.env.DOCKER_ENV === 'true';
let dbHost: string;
if (isRunningInDocker) {
  dbHost = process.env.PGHOST || 'db';
} else {
  dbHost = 'localhost';
}

export const pool = new Pool({
  host: dbHost,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Define GraphQL context type
export interface Context {
  db: Pool;
}

// Context function for Apollo Server
export const createContext = async (): Promise<Context> => ({
  db: pool
});
