import { app } from './app';
import { config } from './config';
import { logger } from './utils/logger';

const start = async () => {
  try {
    const port = config.port;
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

start();