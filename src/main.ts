import { env } from './config/env.js';
import { createApp } from './app/app.js';

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`API server is running on port ${env.PORT}`);
});
