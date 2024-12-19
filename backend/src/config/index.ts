import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  port: z.number().default(3000),
  nodeEnv: z.string().default('development'),
  jwtSecret: z.string(),
  database: z.object({
    url: z.string(),
  }),
  unifi: z.object({
    controllerUrl: z.string(),
    username: z.string(),
    password: z.string(),
  }),
});

const config = configSchema.parse({
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    url: process.env.DATABASE_URL,
  },
  unifi: {
    controllerUrl: process.env.UNIFI_CONTROLLER_URL,
    username: process.env.UNIFI_USERNAME,
    password: process.env.UNIFI_PASSWORD,
  },
});

export { config };