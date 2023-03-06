import { join } from 'path';
import * as dotenv from 'dotenv';

export const captureEnvs = async (filepath: string) => {
  const envPath = join(filepath, '.env');

  return dotenv.config({ path: envPath }).parsed;
};
