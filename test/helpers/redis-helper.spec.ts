import { Redis } from 'ioredis';
import { notAvailable } from '../../src/common/helpers/http';
import { RedisHelper } from '../../src/common/helpers/redis';

describe('RedisMockHelper', () => {
  let redisClient: Redis;
  let redisClientNotAvaliable: any;

  beforeAll(async () => {
    redisClient = await RedisHelper.getClient();
    redisClientNotAvaliable = await RedisHelper.getClient(true);
  });

  afterAll(async () => {
    redisClient && (await redisClient.quit());
  });
  
  it('should set and get values from key Redis', async () => {
    await redisClient.set('key', 'values');
    const response = await redisClient.get('key');
    expect(response).toEqual('values');
    await redisClient.del('key')
  });

  it('should return redis not available', async () => {
    const response = await redisClientNotAvaliable;
    expect(response.statusCode).toEqual(notAvailable().statusCode);
    expect(response.body).toEqual(notAvailable("redis not available").body);
  });
});
