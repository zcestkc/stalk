import * as z from 'zod';
import 'dotenv/config';

const createEnv = () => {
  const EnvSchema = z.object({
    ALPHA_VANTAGE_API_KEY: z.string(),
    API_URL: z.string(),
  });

  const envVars = {
    ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
    API_URL: process.env.API_URL,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n')}
  `,
    );
  }

  return parsedEnv.data ?? {};
};

export const env = createEnv();
