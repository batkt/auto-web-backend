import Redis from 'ioredis';
import { env } from './env';

class RedisSingleton {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisSingleton.instance) {
      RedisSingleton.instance = new Redis(env.redis.url);
      RedisSingleton.instance.on('error', (err) => console.error('Redis Client Error:', err));
      RedisSingleton.instance.on('connect', () => console.log('Connected to Redis'));
    }
    return RedisSingleton.instance;
  }
}

export const redisClient = RedisSingleton.getInstance();
