import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';

import { errorHandler } from './middleware/error.middleware';
import { authRouter } from './modules/auth/auth.routes';
import { authenticate } from './middleware/auth.middleware';
import { userRouter } from './modules/user/user.routes';
import productRouter from './modules/products/product.routes';
import brandRouter from './modules/brands/brands.routes';

import sectionRouter from './modules/section/section.routes';
import pageRouter from './modules/page/page.routes';
import fileRouter from './modules/file/file.routes';
import branchRouter from './modules/branch/branch.routes';
import blogRouter from './modules/blog/blog.routes';
import categoryRouter from './modules/category/category.routes';
import { connectDB } from './config/mongodb';
import path from 'path';
import { contactRouter } from './modules/contact/contact.routes';
import surveyRouter from './modules/survey/survey.routes';

const app = express();

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request timeout middleware
app.use((req, res, next) => {
  res.setTimeout(30000, () => {
    res.status(408).json({
      status: 'error',
      message: 'Request timeout',
    });
  });
  next();
});

// Static file serving for uploads
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'), {
    setHeaders: (res, path) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  }),
);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', authenticate, userRouter);
app.use('/api/sections', sectionRouter);
app.use('/api/pages', pageRouter);
app.use('/api/files', fileRouter);
app.use('/api/branches', branchRouter);
app.use('/api', blogRouter);
app.use('/api', categoryRouter);
app.use('/api/contact', contactRouter);
app.use('/api', surveyRouter);
app.use('/api/products', productRouter);
// app.use('/api', brandRouter);
app.use('/api', brandRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = env.server.port;
const server = app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err);
  // Don't crash the server
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  // Don't crash the server
});
