import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '60 s'), // 10 requests per 60 seconds
    analytics: true, // optional, for Upstash dashboard
    prefix: 'pmr_rl', // unique prefix for your project
});

export async function getClientKey(id: string) {
    // const forwardedFor = req.headers.get('x-forwarded-for');
    // const realIp = req.headers.get('x-real-ip');
    // const ip = forwardedFor?.split(',')[0].trim() || realIp || 'localhost';
    
    return `id_${id}`;
}
