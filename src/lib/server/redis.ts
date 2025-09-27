import { Redis } from '@upstash/redis';

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_ENDPOINT,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
