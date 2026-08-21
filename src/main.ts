import { env } from './config/env.js';

console.log({
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
});
