import Redis, { Redis as RedisClient } from 'ioredis';
import { notAvailable } from './http';

export class RedisHelper {
  static redisClient: RedisClient;

  static async getClient(redisTestToFailed?: boolean): Promise<any> {
    const noHost = 'no_host';
    const redisConnection = new Redis({
      host: redisTestToFailed ? noHost : process.env.REDIS_HOST,
      port: 6379,
      db: 0,
    });

    if (
      redisConnection.options.host === noHost ||
      !redisConnection.options.host
    ) {
      return notAvailable('redis not available');
    }

    this.redisClient = redisConnection;
    return this.redisClient;
  }
}
