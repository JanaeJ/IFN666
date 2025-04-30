import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import router from './src/routes/index.js';
import { errorHandler, notFound } from './src/middleware/errorMiddleware.js';
import userRoutes from './src/routes/userRoutes.js'; // 引入用户路由

dotenv.config(); 

if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env file");
  process.exit(1); 
}

const app = express();
const PORT = process.env.PORT || 5002;

app.get('/', (req, res) => {
    res.send('Welcome to the Language Learning API!');
  });

 

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      referrerPolicy: { policy: 'no-referrer' },
      frameguard: { action: 'deny' },
      hidePoweredBy: true,
      noSniff: true,
    })
  );
  
app.use(cors());
app.use(express.json());

// --------ratelimit

const rateLimitConfig = {
  public: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests, please try again later"
  },
  authenticated: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,
    message: "You've made too many requests, please try again later"
  },
  sensitive: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10,
    message: "Too many attempts, please try again in 5 minutes"
  }
};

// 通用速率限制器 - 对所有请求生效
const generalLimiter = rateLimit({
  windowMs: rateLimitConfig.public.windowMs,
  max: (req) => {
    // 如果请求头有 Authorization 令牌，认为是认证用户
    return req.headers.authorization ? rateLimitConfig.authenticated.max : rateLimitConfig.public.max;
  },
  message: (req) => {
    return req.headers.authorization ? rateLimitConfig.authenticated.message : rateLimitConfig.public.message;
  },
  keyGenerator: (req) => {
    // 使用IP地址作为键，但对认证用户添加前缀
    return req.headers.authorization ? `auth_${req.ip}` : `pub_${req.ip}`;
  },
  skip: (req) => {
    // 跳过健康检查等路由
    return req.path === '/' || req.path === '/health';
  }
});

// 敏感路由速率限制器 - 专门用于登录/注册
const authLimiter = rateLimit({
  windowMs: rateLimitConfig.sensitive.windowMs,
  max: rateLimitConfig.sensitive.max,
  message: rateLimitConfig.sensitive.message,
  keyGenerator: (req) => `auth_attempt_${req.ip}`, // 为认证尝试单独设置键
  skip: (req) => !['/api/users/login', '/api/users/register'].includes(req.path)
});

// 应用中间件
app.use(generalLimiter); // 应用到所有路由
app.use('/api/users/login', authLimiter); // 特别限制登录
app.use('/api/users/register', authLimiter); // 特别限制注册




console.log("MongoDB URI:", process.env.MONGODB_URI); // Debugging line to check the URI

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// 使用用户路由
app.use('/api/users', userRoutes);
app.use('/api', router); // 保持其他路由的使用
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});