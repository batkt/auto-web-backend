import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'REDIS_URL', 'PORT', 'NODE_ENV'] as const;

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export const env = {
  database: {
    url: process.env.DATABASE_URL!,
    defaultUserPassword: process.env.USER_PASSWORD!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    ttl: 24 * 60 * 60, // 1 өдөр секундаар
  },
  redis: {
    url: process.env.REDIS_URL!,
  },
  server: {
    port: Number(process.env.PORT!),
    nodeEnv: process.env.NODE_ENV!,
    frontendUrl: process.env.FRONTEND_URL!,
  },
} as const;
