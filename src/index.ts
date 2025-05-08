import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import routes from './api/routes';
import { errorMiddleware } from './middleware/error.middleware';
import { logger } from './utils/logger';

// Load environment variables
config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Error handling
app.use(errorMiddleware);

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
}); 