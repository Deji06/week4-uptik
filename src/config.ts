import dotenv from 'dotenv';
dotenv.config();

interface EnvConfig {
  JWT_SECRET: string;
  PORT: string;
  MONGO_URI: string;
}

function validateEnv(): EnvConfig {
  const requiredVars = ['JWT_SECRET', 'PORT', 'MONGO_URI'];
  const missingVars: string[] = [];

  for (const key of requiredVars) {
    if (!process.env[key]) {
      missingVars.push(key);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return {
    JWT_SECRET: process.env.JWT_SECRET as string,
    PORT: process.env.PORT as string,
    MONGO_URI: process.env.MONGO_URI as string,
  };
}

export const config = validateEnv();