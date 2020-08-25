import IORedis from 'ioredis';
import { Service } from 'typedi';
import { Config } from './../config';

@Service()
export class RedisService {
    private client: IORedis.Redis;

    constructor() {
        const redisUrl: string = `${Config.REDIS_HOST}:${Config.REDIS_PORT}`;
        this.client = new IORedis(redisUrl);
    }

    /**
     * Fetches the data from redis based on type and searchText provided
     * 
     * @param type - search type
     * @param searchText - search text
     * 
     * @returns data for the given type and search param
     */
    public async get(type: string, searchText: string): Promise<string> {
        return this.client.get(RedisService.getKey(type, searchText));
    }

    /**
     * Prepares key to set in redis
     * 
     * @param type - search type
     * @param searchText - search text
     * 
     * @returns key that is used to identify the data uniquely
     */
    public static getKey(type: string, searchText: string): string {
        return `github_${type}_${searchText}`;
    }

    /**
     * Stores the data in the redis 
     * 
     * @param type - search type
     * @param searchText - search text
     * @param values - stringified search result
     * 
     */
    public async set(type: string, searchText: string, value: string): Promise<'OK'> {
        return this.client.set(RedisService.getKey(type, searchText), value, 'EX', Config.REDIS_CACHE_TTL);
    }

    /**
     * Fetches all keys from redis and clears the data
     */
    public async clearCache(): Promise<{}> {
        // Create a readable stream (object mode)
        return new Promise((resolve, reject) => {
            const stream = this.client.scanStream({
                match: 'github_*',
            });
            stream.on('data', (keys) => {
                // `keys` is an array of strings representing key names
                if (keys.length) {
                    const pipeline = this.client.pipeline();
                    keys.forEach((key: string) => {
                        pipeline.del(key);
                    });
                    pipeline.exec();
                }
            });
            stream.on('error', reject);
            stream.on('end', () => {
                resolve(true);
            });
        });
    }
}
